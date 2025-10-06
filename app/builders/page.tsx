'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code2,
  Rocket,
  Users,
  BookOpen,
  Award,
  ArrowUp,
  Calendar,
  ExternalLink,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle2,
  Clock,
  Sparkles,
  Heart
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function BuildersPage() {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      dates: 'Cerrado',
    },
    {
      phase: 'Selección',
      title: 'Selección técnica',
      description: 'Revisión de github y/o portfolio',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      duration: '1 semana',
      dates: 'Octubre',
    },
    {
      phase: 'Programa principal',
      title: 'Código Futura (online, sincrónico)',
      description: 'Clases martes y jueves 18:30-20:00 + sábados de refuerzo. Labs y proyectos prácticos en Web3',
      icon: BookOpen,
      gradient: 'from-teal-500 to-green-500',
      duration: '7 semanas',
      dates: '7 Oct - 13 Nov',
    },
    {
      phase: 'Builder Retreat',
      title: 'Casa Builder (con beca, presencial)',
      description: 'Experiencia inmersiva exclusiva para 20 builders seleccionadas que van a viajar a Buenos Aires, Argentina',
      icon: Rocket,
      gradient: 'from-orange-500 to-red-500',
      duration: '1 semana',
      dates: '16-23 Nov',
    },
    {
      phase: 'Bootcamp Presencial',
      title: 'Bootcamp intensivo (opcional y presencial)',
      description: 'Sesiones presenciales avanzadas y networking en Buenos Aires, Argentina',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      duration: '3 días',
      dates: '17-19 Nov',
    },
    {
      phase: 'Hackathon',
      title: 'Hackathon Stellar (obligatorio y presencial)',
      description: 'Construye tu proyecto final y demuestra todo lo aprendido',
      icon: Code2,
      gradient: 'from-cyan-500 to-blue-500',
      duration: '3 días',
      dates: '20-22 Nov',
    },
    {
      phase: 'Graduación',
      title: 'Certificación y Portfolio',
      description: 'Certificación oficial y acompañamiento continuo',
      icon: Award,
      gradient: 'from-yellow-500 to-orange-500',
      duration: 'Lifetime',
      dates: 'Nov 2025',
    },
  ];

  const stats = [
    { number: '200+', label: 'Aplicaciones recibidas', icon: Users },
    { number: '7', label: 'Semanas de formación', icon: Calendar },
    { number: '100%', label: 'Gratuito', icon: CheckCircle2 },
    { number: '20', label: 'Becas Builder Retreat', icon: Rocket },
  ];

  const faqs = [
    {
      question: '¿Habrá otra edición del programa?',
      answer: 'Estamos evaluando futuras ediciones. Mantente atenta a nuestras redes sociales para enterarte de novedades y próximas convocatorias.',
    },
    {
      question: '¿Fue realmente gratis este programa?',
      answer: 'Sí, nuestro programa de formación es completamente gratuito para builders. Nos financiamos a través de servicios B2B con empresas y protocolos.',
    },
    {
      question: '¿Qué nivel técnico se necesitaba?',
      answer: 'Buscábamos programadoras con experiencia en desarrollo. No se necesitaba conocimiento previo en Web3, eso se enseñaba durante el programa.',
    },
    {
      question: '¿Cómo fue el horario de las clases?',
      answer: 'Las clases fueron martes y jueves de 18:30 a 20:00, más sábados de refuerzo durante 7 semanas (del 7 de octubre al 13 de noviembre). El hackathon final del 20-22 de noviembre es obligatorio y presencial.',
    },
    {
      question: '¿Qué es el Builder Retreat del 16-23 de noviembre?',
      answer: 'Es una experiencia inmersiva de una semana para 20 builders seleccionadas con beca que viajaran a Buenos Aires, Argentina. Incluye el bootcamp presencial (17-19 nov) y networking exclusivo.',
    },
    {
      question: '¿Cómo puedo estar al tanto de próximas ediciones?',
      answer: 'Síguenos en nuestras redes sociales (Twitter/X, LinkedIn e Instagram) donde anunciamos todas las novedades, convocatorias y actualizaciones del programa.',
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
            <Badge className="mb-6 px-4 py-2 bg-orange-500/10 text-orange-500 border-orange-500/20">
              <Clock className="w-4 h-4 mr-2 inline" />
              Postulaciones Cerradas
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                Código Futura 2025
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Las postulaciones para esta edición han cerrado exitosamente.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              <Heart className="inline w-5 h-5 text-pink-500 mr-2" />
              ¡Gracias a todas las programadoras que aplicaron! El programa está en marcha con builders increíbles transformándose de Web2 a Web3.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Código Futura 2025 en números</h2>
            <p className="text-muted-foreground">El impacto de nuestra primera edición</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">El viaje de las builders</h2>
            <p className="text-xl text-muted-foreground">
              Un proceso estructurado de transformación de Web2 a Web3
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
                        <div className="flex items-center justify-between text-sm">
                          <p className="font-medium text-purple-500">Duración: {step.duration}</p>
                          <p className="font-semibold text-blue-500">{step.dates}</p>
                        </div>
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
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-purple-500" />
          <h2 className="text-3xl font-bold mb-6">¡Seguinos en nuestras redes!</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Mantente al día con el progreso del programa actual y entérate de futuras convocatorias
          </p>
          <p className="text-muted-foreground mb-8">
            Conecta con nuestra comunidad de builders y sé parte de la transformación Web3
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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

      {/* Future Editions CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-border/50">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  ¿Futuras ediciones?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Estamos evaluando próximas convocatorias. Mientras tanto, síguenos en redes sociales para no perderte ninguna novedad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">
                  Anunciaremos nuevas fechas en nuestras redes sociales
                </span>
              </div>
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
              Respuestas sobre el programa y futuras ediciones
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