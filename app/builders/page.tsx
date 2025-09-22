'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/email-service';
import {
  Code2,
  Rocket,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  ArrowUp,
  Loader2,
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

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
    githubUrl: '',
    fullAddress: '',
    novemberCommitment: false,
    twitterX: '',
    linkedin: '',
    instagram: '',
    followOurSocials: false,
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
    // Validación de campos obligatorios
    if (!formData.fullName || !formData.email || !formData.githubUrl || !formData.fullAddress) {
      toast({
        title: "Error de validación",
        description: "Por favor, completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Validar compromisos obligatorios
    if (!formData.novemberCommitment || !formData.followOurSocials) {
      toast({
        title: "Error de validación",
        description: "Debes aceptar ambos compromisos para continuar",
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

    // Validar que GitHub URL sea válida
    const githubRegex = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
    if (!githubRegex.test(formData.githubUrl)) {
      toast({
        title: "GitHub URL inválida",
        description: "Por favor, ingresa una URL válida de GitHub (ej: https://github.com/username)",
        variant: "destructive",
      });
      return;
    }

    // Insertar aplicación en la NUEVA tabla Supabase
    const { data, error } = await supabase
      .from('builders_applications') // ← NUEVA TABLA
      .insert([
        {
          full_name: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          github_url: formData.githubUrl.trim(),
          full_address: formData.fullAddress.trim(),
          november_commitment: formData.novemberCommitment,
          twitter_x: formData.twitterX.trim() || null,
          linkedin: formData.linkedin.trim() || null,
          instagram: formData.instagram.trim() || null,
          follow_our_socials: formData.followOurSocials,
        }
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error al guardar:', error);
      
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

    // Enviar email de confirmación
    try {
      await sendEmail('builders', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        githubUrl: formData.githubUrl.trim(),
        fullAddress: formData.fullAddress.trim(),
      });
    } catch (emailError) {
      console.error('Error enviando email de confirmación:', emailError);
    }
    
    toast({
      title: "¡Éxito!",
      description: "¡Aplicación enviada exitosamente! Te contactaremos pronto y recibirás un email de confirmación.",
    });

    // Limpiar formulario
    setFormData({
      fullName: '',
      email: '',
      githubUrl: '',
      fullAddress: '',
      novemberCommitment: false,
      twitterX: '',
      linkedin: '',
      instagram: '',
      followOurSocials: false,
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
      description: 'Formulario con tus datos y redes sociales',
      icon: Code2,
      gradient: 'from-blue-500 to-cyan-500',
      duration: '10 min',
    },
    {
      phase: 'Selección',
      title: 'Selección técnica',
      description: 'Revisión de github y/o portfolio',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      duration: '1 semana',
    },
    {
      phase: 'Formación y Proyecto',
      title: 'Programa intensivo de construcción real',
      description: 'Clases, labs y proyectos prácticos',
      icon: BookOpen,
      gradient: 'from-teal-500 to-green-500',
      duration: '8 semanas',
    },
    {
      phase: 'Sorpresa',
      title: 'Eventos de nivel global  + Network',
      description: 'Te acompañamos a tu primer evento',
      icon: Rocket,
      gradient: 'from-orange-500 to-red-500',
      duration: '1 semana',
    },
    {
      phase: 'Graduación',
      title: 'Portfolio y accelerator',
      description: 'Certificación y acompañamiento',
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
      question: '¿Qué pasa en el evento de noviembre?',
      answer: 'Es un evento presencial increíble en noviembre donde todas las builders se reúnen para networking, workshops y celebración.',
    },
    {
      question: '¿Por qué necesitan mi dirección?',
      answer: 'Para enviarte regalitos exclusivos y material del programa directamente a tu casa.',
    },
    {
      question: '¿Puedo trabajar mientras estudio?',
      answer: 'El programa requiere dedicación significativa. Recomendamos tener flexibilidad laboral, especialmente para el evento de noviembre.',
    },
  ];

  const socialLinks = [
    { name: 'Twitter/X', icon: Twitter, url: 'https://x.com/buendiabuilders' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/buen-dia-builders' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/buendia_builders/' },
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
              Un proceso estructurado que te lleva desde la aplicación hasta el evento en noviembre
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

      {/* Social Media CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¡Seguinos en nuestras redes!</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Mantente al día con el programa y conecta con otras builders
          </p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="lg"
                className="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
                onClick={() => window.open(social.url, '_blank')}
              >
                <social.icon className="mr-2 h-5 w-5" />
                {social.name}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            ))}
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
                {/* Campos básicos obligatorios */}
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
                    <Github className="inline w-4 h-4 mr-1" />
                    GitHub <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/tuusername"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Dirección completa para envío de regalitos <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.fullAddress}
                    onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                    placeholder="Calle 123, Ciudad, Provincia/Estado, País, Código Postal"
                    rows={3}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Redes sociales opcionales */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Redes sociales (opcionales)</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Twitter className="inline w-4 h-4 mr-1" />
                        Twitter/X
                      </label>
                      <Input
                        value={formData.twitterX}
                        onChange={(e) => setFormData({ ...formData, twitterX: e.target.value })}
                        placeholder="https://x.com/username"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Linkedin className="inline w-4 h-4 mr-1" />
                        LinkedIn
                      </label>
                      <Input
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Instagram className="inline w-4 h-4 mr-1" />
                        Instagram
                      </label>
                      <Input
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        placeholder="https://instagram.com/username"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Compromisos obligatorios */}
                <div className="space-y-4 p-4 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 rounded-lg border border-yellow-500/20">
                  <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300">
                    <Calendar className="inline w-5 h-5 mr-2" />
                    Compromisos importantes
                  </h3>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="november-commitment"
                      checked={formData.novemberCommitment}
                      onCheckedChange={(checked) => setFormData({ ...formData, novemberCommitment: !!checked })}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                    <label htmlFor="november-commitment" className="text-sm font-medium leading-relaxed">
                      Me comprometo a estar disponible <strong>1 semana completa en noviembre (entre el 10 y 20)</strong> para participar del evento presencial 🎉
                      <span className="text-red-500"> *</span>
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="follow-socials"
                      checked={formData.followOurSocials}
                      onCheckedChange={(checked) => setFormData({ ...formData, followOurSocials: !!checked })}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                    <label htmlFor="follow-socials" className="text-sm font-medium leading-relaxed">
                      Me comprometo a seguir sus redes sociales (Twitter/X, LinkedIn e Instagram) para estar al día con el programa 📱
                      <span className="text-red-500"> *</span>
                    </label>
                  </div>
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

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Preguntas Frecuentes</h2>
            <p className="text-xl text-muted-foreground">
              Respuestas a las preguntas más comunes sobre el programa
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