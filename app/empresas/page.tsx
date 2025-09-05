'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/email-service';
import { 
  Building2, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Target, 
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  DollarSign,
  Award,
  Loader2
} from 'lucide-react';
import { useState } from 'react';
import { supabase, type CompanyInquiry } from '@/lib/supabase';

export default function EmpresasPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    role: '',
    needs: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!formData.company || !formData.name || !formData.email || !formData.role || !formData.needs) {
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

      // Guardar en Supabase
      const { data, error } = await supabase
        .from('company_inquiries')
        .insert([{
          company: formData.company.trim(),
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role.trim(),
          needs: formData.needs.trim(),
        }])
        .select()
        .single();

      if (error) {
        console.error('Error al guardar:', error);
          toast({
            title: "Error al enviar",
            description: "Error al enviar la consulta. Inténtalo de nuevo.",
            variant: "destructive",
          });
        return;
      }

      try {
        await sendEmail('empresas', {
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role.trim(),
          needs: formData.needs.trim(),
        });
    } catch (emailError) {
          console.error('Error enviando email de confirmación:', emailError);
    }
    
    toast({
      title: `¡Gracias ${formData.name}!`,
      description: "Tu solicitud ha sido enviada correctamente. Te redirigimos a nuestro calendario para que puedas agendar la llamada. También recibirás un email de confirmación.",
    });

      // Limpiar formulario
      setFormData({
        company: '',
        name: '',
        email: '',
        role: '',
        needs: '',
      });

      // Redirigir al calendario (pequeño delay para ver el toast)
      setTimeout(() => {
        window.open('https://calendar.app.google/XqUmUcgMq8ozc8dD9', '_blank');
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema enviando tu solicitud. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      title: 'Talent Acquisition Web3',
      description: 'Sourcing de candidates pre-screened con assessment técnico especializado',
      icon: Users,
      features: [
        'Sourcing de candidates pre-screened',
        'Technical assessment especializado',
        'Cultural fit y soft skills evaluation',
        'Garantía de replacement 90 días',
      ],
      pricing: 'Fee por contratación exitosa',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Corporate Training',
      description: 'Capacitación ejecutiva y técnica para acelerar la adopción Web3',
      icon: BookOpen,
      features: [
        'Workshops ejecutivos blockchain',
        'Capacitación técnica para equipos',
        'Programas de transformation digital',
        'Certificaciones internas',
      ],
      pricing: 'Por participante/día',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Strategic Consulting',
      description: 'Consultoría estratégica para definir roadmap Web3 de tu organización',
      icon: Target,
      features: [
        'Blockchain readiness assessment',
        'Technology roadmap Web3',
        'Token economics advisory',
        'Partnership blockchain strategy',
      ],
      pricing: 'Retainer mensual + project-based',
      gradient: 'from-teal-500 to-green-500',
    },
    {
      title: 'Custom Programs',
      description: 'Programas a medida para necesidades específicas de tu empresa',
      icon: Award,
      features: [
        'Hackathons corporativos',
        'Innovation labs setup',
        'Academic partnerships',
        'Employer branding Web3',
      ],
      pricing: 'Quote personalizado',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery Call',
      description: 'Entendemos tus necesidades específicas y contexto empresarial',
      duration: '1 hora',
      deliverable: 'Diagnóstico inicial',
    },
    {
      step: '02', 
      title: 'Propuesta Customizada',
      description: 'Diseñamos plan específico con timeline y pricing transparente',
      duration: '3-5 días',
      deliverable: 'Proposal detallada',
    },
    {
      step: '03',
      title: 'Ejecución',
      description: 'Delivery con métricas claras y comunicación constante',
      duration: 'Variable',
      deliverable: 'Reportes semanales',
    },
    {
      step: '04',
      title: 'Follow-up',
      description: 'Soporte continuo y optimización basada en resultados',
      duration: 'Ongoing',
      deliverable: 'Success metrics',
    },
  ];

  const talentPipeline = [
    {
      level: 'Junior Builders',
      // experience: '0-2 años',
      description: 'Alta motivación, formación reciente',
      skills: ['Blockchain basics', 'Smart contracts', 'Web3 fundamentals'],
      salary: '$40k-60k USD',
    },
    {
      level: 'Nivel-Medio',
      // experience: '2-4 años', 
      description: 'Proyectos reales, experiencia práctica',
      skills: ['protocolos DeFi', 'Full-stack Web3', 'Diseños de Sistemas'],
      salary: '$60k-90k USD',
    },
    {
      level: 'Senior',
      // experience: '4+ años',
      description: 'Capacidad de liderazgo, decisiones de arquitectura, mentoría',
      skills: ['Diseño de protocolos', 'Liderazgo de equipos', 'Pensamiento estratégico'],
      salary: '$90k-150k USD',
    },
    {
      level: 'Especialistas',
      // experience: 'Variable',
      description: 'Esperiencia específica en verticales como DeFi, Gaming, Infraestructura',
      skills: ['Experiencia en el dominio', 'Protocolos avanzados', 'Innovación'],
      salary: 'Market premium',
    },
  ];

  // const caseStudies = [
  //   {
  //     company: 'Fintech LATAM',
  //     industry: 'Financial Services',
  //     challenge: 'Incorporar team DeFi para nuevo producto',
  //     solution: 'Talent acquisition + team training program',
  //     results: [
  //       'Team DeFi de 8 personas en 3 meses',
  //       'Producto lanzado 40% más rápido',
  //       '85% retention rate del equipo'
  //     ],
  //     testimonial: '"BdB nos conectó con talento que nunca habríamos encontrado por otros medios."',
  //     author: 'CTO, Fintech LATAM',
  //   },
  //   {
  //     company: 'Banco Regional',
  //     industry: 'Banking',
  //     challenge: 'Implementar blockchain para pagos cross-border',
  //     solution: 'Strategic consulting + corporate training',
  //     results: [
  //       'Roadmap blockchain de 18 meses',
  //       '200+ empleados capacitados',
  //       'POC implementado exitosamente'
  //     ],
  //     testimonial: '"La expertise de BdB aceleró nuestra transformación digital significativamente."',
  //     author: 'Head of Innovation, Banco Regional',
  //   },
  //   {
  //     company: 'Startup SaaS',
  //     industry: 'Technology',
  //     challenge: 'Escalar con Web3 talent para nueva vertical',
  //     solution: 'Custom program + talent pipeline',
  //     results: [
  //       'Team Web3 de 0 a 15 personas',
  //       'Nueva vertical generando revenue',
  //       'Valuación aumentó 300%'
  //     ],
  //     testimonial: '"BdB fue fundamental para nuestro pivot exitoso hacia Web3."',
  //     author: 'CEO, Startup SaaS',
  //   },
  // ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-purple-500/5 to-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-purple-500/10 text-purple-500 border-purple-500/20">
              Para Empresas
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">
                El talento Web3 que tu empresa necesita
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Reclutamiento especializado, capacitación y consultoría estratégica para acelerar la transformación Web3 de tu organización
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              Agendar una llamada de descubrimiento
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      {/* <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Servicios corporativos</h2>
            <p className="text-xl text-muted-foreground">
              Soluciones integrales para cada etapa de tu transformación Web3
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`group relative overflow-hidden bg-gradient-to-br ${service.gradient.replace('from-', 'from-').replace('to-', 'to-')}/5 border-0 hover:shadow-xl transition-all duration-300`}>
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${service.gradient} mb-4`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {service.pricing}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Más info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Process */}
      <section className="py-24 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Nuestro proceso</h2>
            <p className="text-xl text-muted-foreground">
              Metodología probada para delivery exitoso de proyectos Web3 corporativos
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="group text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-purple-500 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm">{step.duration}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {step.deliverable}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Pipeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Talentos</h2>
            <p className="text-xl text-muted-foreground">
              Perfiles disponibles según la necesidad de tu empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {talentPipeline.map((profile, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-2">{profile.level}</h3>
                  {/* <Badge className="mb-4 bg-blue-500/10 text-blue-500">{profile.experience}</Badge> */}
                  
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {profile.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {profile.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        <span className="text-xs">{skill}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* <Badge variant="outline" className="w-full justify-center">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {profile.salary}
                  </Badge> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {/* <section className="py-24 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Case Studies</h2>
            <p className="text-xl text-muted-foreground">
              Resultados reales con empresas que confiaron en nosotros
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{study.company}</h3>
                    <Badge variant="outline">{study.industry}</Badge>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Challenge</h4>
                      <p className="text-muted-foreground text-sm">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Solution</h4>
                      <p className="text-muted-foreground text-sm">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Results</h4>
                      <ul className="space-y-1">
                        {study.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-center text-sm">
                            <TrendingUp className="w-3 h-3 text-green-500 mr-2" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <blockquote className="border-l-4 border-purple-500 pl-4 italic text-sm text-muted-foreground mb-4">
                    {study.testimonial}
                  </blockquote>
                  
                  <p className="text-xs text-muted-foreground">— {study.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Form */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Comencemos a trabajar
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Cuéntanos tus necesidades y te contactaremos en 24 horas
            </p>
          </div>

          <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-border/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Empresa</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Nombre de tu empresa"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tu nombre</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Tu nombre completo"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email corporativo</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="tu@empresa.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tu rol</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="CTO, HR Director, etc."
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">¿Qué necesitas?</label>
                  <Textarea
                    value={formData.needs}
                    onChange={(e) => setFormData({...formData, needs: e.target.value})}
                    placeholder="Describe tu necesidad: hiring, training, consulting..."
                    rows={4}
                    required
                    disabled={isSubmitting}
                  />
                </div>
{/* 
                <div>
                  <label className="block text-sm font-medium mb-2">Timeline</label>
                  <Input
                    value={formData.timeline}
                    onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                    placeholder="¿Cuándo necesitas implementar?"
                    required
                    disabled={isSubmitting}
                  />
                </div> */}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar llamada de descubrimiento
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}