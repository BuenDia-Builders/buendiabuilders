'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/email-service';
import {
  Code2,
  Rocket,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Brain,
  Heart,
  ArrowUp,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase, type ApplicationFormData } from '@/lib/supabase';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function BuildersPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    technicalExperience: '',
    whyWeb3: '',
    portfolioGithub: '',
    accessCode: '',
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Monitor scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.fullName || !formData.email || !formData.technicalExperience || !formData.whyWeb3) {
        toast({
          title: "Error de validación",
          description: "Por favor, completa todos los campos obligatorios",
          variant: "destructive",
        });
        return;
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Email inválido",
          description: "Por favor, ingresa un email válido",
          variant: "destructive",
        });
        return;
      }

      const hasAccessCode = formData.accessCode.trim() !== '';
      
      // Si hay código de acceso, verificar disponibilidad y registrar uso
      if (hasAccessCode) {
        const accessCode = formData.accessCode.trim();
        const userEmail = formData.email.trim().toLowerCase();
        
        // Buscar TODOS los registros con este código
        const { data: codeResults, error: codeCheckError } = await supabase
          .from('access_code_usage')
          .select('*')
          .eq('code', accessCode);
          
        if (codeCheckError) {
          toast({
            title: "Error con código de acceso",
            description: "No se pudo verificar el código de acceso",
            variant: "destructive",
          });
          return;
        }
        
        if (!codeResults || codeResults.length === 0) {
          toast({
            title: "Código inválido",
            description: "El código de acceso no existe",
            variant: "destructive",
          });
          return;
        }
        
        // Verificar si este email YA usó este código
        const emailAlreadyUsed = codeResults.some(record => record.email === userEmail);
        
        if (emailAlreadyUsed) {
          toast({
            title: "Código ya usado",
            description: "Este email ya utilizó este código de acceso",
            variant: "destructive",
          });
          return;
        }
        
        // Contar cuántos emails DIFERENTES han usado este código
        const uniqueEmailsUsed = new Set(codeResults.map(record => record.email)).size;
        const maxUses = codeResults[0].max_uses; // Máximo de emails diferentes permitidos
        
        if (uniqueEmailsUsed >= maxUses) {
          toast({
            title: "Código agotado",
            description: `Este código ya fue usado por ${maxUses} usuarios diferentes`,
            variant: "destructive",
          });
          return;
        }
        
        // Crear nueva entrada para este email (1 uso por email)
        const { error: createCodeError } = await supabase
          .from('access_code_usage')
          .insert([{
            code: accessCode,
            email: userEmail,
            current_uses: 1, // Siempre 1 porque cada email solo puede usar 1 vez
            max_uses: maxUses,
            used_at: new Date().toISOString()
          }]);
          
        if (createCodeError) {

          // Si es error de duplicado (email ya existe para este código)
          if (createCodeError.code === '23505') {
            toast({
              title: "Código ya usado",
              description: "Este email ya utilizó este código de acceso",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error con código de acceso",
              description: "No se pudo registrar el uso del código",
              variant: "destructive",
            });
          }
          return;
        }
      }

      // Insertar aplicación en Supabase
      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            full_name: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            technical_experience: formData.technicalExperience.trim(),
            why_web3: formData.whyWeb3.trim(),
            portfolio_github: formData.portfolioGithub.trim() || null,
            has_access_code: hasAccessCode,
          }
        ])
        .select()
        .maybeSingle();

      if (error) {
        console.error('Error al guardar:', error);
        console.error('Error message:', error.message);
        console.error('Error details:', error.details);
        
        // Manejar errores específicos
        if (error.code === '23505' || error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
          toast({
            title: "Email duplicado",
            description: "Ya existe una aplicación con este email",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error al enviar",
            description: error.message || "Error al enviar la aplicación. Inténtalo de nuevo.",
            variant: "destructive",
          });
        }
        return;
      }
    try {
      await sendEmail('builders', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        hasAccessCode: hasAccessCode,
        technicalExperience: formData.technicalExperience.trim(),
        whyWeb3: formData.whyWeb3.trim(),
      });
    } catch (emailError) {
      console.error('Error enviando email de confirmación:', emailError);
      // El email falló pero la aplicación se guardó, continuar
    }
    
    toast({
      title: "¡Éxito!",
      description: hasAccessCode 
        ? "Felicitaciones! tenés acceso privilegiado a nuestro programa, te contactaremos pronto y recibirás un email de confirmación." 
        : "¡Aplicación enviada exitosamente! Te contactaremos pronto y recibirás un email de confirmación.",
    });

      // Limpiar formulario
      setFormData({
        fullName: '',
        email: '',
        technicalExperience: '',
        whyWeb3: '',
        portfolioGithub: '',
        accessCode: '',
      });


    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema enviando tu aplicación. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to scroll to form section
  const scrollToForm = () => {
    const formSection = document.getElementById('application-form');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const journey = [
    {
      phase: 'Aplicación',
      title: 'Completa tu perfil',
      description: 'Hablemos sobre tu experiencia y motivación',
      icon: Code2,
      gradient: 'from-blue-500 to-cyan-500',
      duration: '1 día',
    },
    {
      phase: 'Selección',
      title: 'Entrevista técnica',
      description: 'Assessment de habilidades y fit cultural',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      duration: '1 semana',
    },
    {
      phase: 'Formación',
      title: 'Programa intensivo',
      description: 'Clases, labs y proyectos prácticos',
      icon: BookOpen,
      gradient: 'from-teal-500 to-green-500',
      duration: '12 semanas',
    },
    {
      phase: 'Proyecto',
      title: 'Construcción real',
      description: 'Desarrolla con mentorías y feedback',
      icon: Rocket,
      gradient: 'from-orange-500 to-red-500',
      duration: '4 semanas',
    },
    {
      phase: 'Graduación',
      title: 'Portfolio + Network',
      description: 'Certificación',
      icon: Award,
      gradient: 'from-yellow-500 to-orange-500',
      duration: 'Lifetime',
    },
  ];

  const faqs = [
    {
      question: '¿Es realmente gratis?',
      answer: 'Sí, nuestro programa de formación es completamente gratuito para builders. Nos financiamos a través de servicios B2B con empresas y protocolos.',
    },
    {
      question: '¿Qué nivel técnico necesito?',
      answer: 'Buscamos programadoras con experiencia. No necesitas conocimiento previo en Web3, eso lo enseñamos.',
    },
    {
      question: '¿Cómo es el proceso de selección?',
      answer: 'Aplicación online + entrevista técnica + evaluación motivacional. Buscamos tanto skills como fit cultural y ganas de aprender.',
    },
    {
      question: '¿Garantizan trabajo al final?',
      answer: 'No garantizamos empleo, pero sí te preparamos con portfolio, network y skills demandadas.',
    },
    {
      question: '¿Puedo trabajar mientras estudio?',
      answer: 'El programa requiere dedicación significativa. Recomendamos tener flexibilidad laboral o estudiar en modalidad part-time.',
    },
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-blue-500/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-blue-500/10 text-blue-500 border-blue-500/20">
              Para Programadoras
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                Tu viaje a Web3 comienza aquí
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Programa intensivo y gratuito que te transforma de <br />Programadora Web2 a Programadora Web3
            </p>
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Aplicar ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Tu viaje paso a paso</h2>
            <p className="text-xl text-muted-foreground">
              Un proceso estructurado que te lleva desde la aplicación hasta la construcción de proyectos reales
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 opacity-30" />

            <div className="space-y-16">
              {journey.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border-border/50">
                      <CardContent className="p-8">
                        <Badge className={`mb-4 bg-gradient-to-r ${step.gradient} text-white`}>
                          {step.phase}
                        </Badge>
                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <p className="text-sm font-medium text-purple-500">Duración: {step.duration}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-24 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Aplica ahora
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Comienza tu transformación a Web3 builder hoy mismo
            </p>
          </div>

          <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-border/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Tu nombre completo"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Experiencia técnica <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.technicalExperience}
                    onChange={(e) => setFormData({ ...formData, technicalExperience: e.target.value })}
                    placeholder="Cuéntanos sobre tu background técnico, lenguajes, frameworks, años de experiencia..."
                    rows={4}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    ¿Por qué Web3? <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.whyWeb3}
                    onChange={(e) => setFormData({ ...formData, whyWeb3: e.target.value })}
                    placeholder="¿Qué te motiva a hacer el cambio a Web3? ¿Qué esperas lograr?"
                    rows={4}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Portfolio/GitHub</label>
                  <Input
                    value={formData.portfolioGithub}
                    onChange={(e) => setFormData({ ...formData, portfolioGithub: e.target.value })}
                    placeholder="https://github.com/tuusername o tu portfolio"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Código de acceso</label>
                  <Input
                    value={formData.accessCode}
                    onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
                    placeholder="Si no tenés código no te preocupes!"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando aplicación...
                    </>
                  ) : (
                    <>
                      Enviar aplicación
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ con acordeón */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Preguntas de Programadoras</h2>
            <p className="text-xl text-muted-foreground">
              Respuestas a las preguntas más frecuentes
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border rounded-lg hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold hover:bg-muted/30 transition">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}