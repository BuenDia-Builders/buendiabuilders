'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
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
  Heart
} from 'lucide-react';
import { useState } from 'react';

export default function BuildersPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    motivation: '',
    portfolio: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Builder application:', formData);
  };

  const journey = [
    {
      phase: 'Aplicación',
      title: 'Completa tu perfil',
      description: 'Cuéntanos sobre tu experiencia y motivación',
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
      title: 'Build real',
      description: 'Desarrolla con mentorías y feedback',
      icon: Rocket,
      gradient: 'from-orange-500 to-red-500',
      duration: '4 semanas',
    },
    {
      phase: 'Graduación',
      title: 'Portfolio + Network',
      description: 'Certificación y job placement',
      icon: Award,
      gradient: 'from-yellow-500 to-orange-500',
      duration: 'Lifetime',
    },
  ];

  const builderTypes = [
    {
      title: 'EXPLORADOR WEB3',
      description: 'Curioso por naturaleza, siempre en busca de las últimas innovaciones',
      icon: Target,
      skills: ['Blockchain fundamentals', 'Smart contracts basics', 'DeFi protocols'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'SOLUCIONADOR',
      description: 'Encuentra soluciones creativas a problemas complejos del ecosistema',
      icon: Brain,
      skills: ['Problem solving', 'System design', 'Architecture patterns'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'CREADOR',
      description: 'Construye herramientas y aplicaciones que impactan positivamente',
      icon: Zap,
      skills: ['Full-stack development', 'UI/UX design', 'Product development'],
      color: 'from-teal-500 to-green-500',
    },
    {
      title: 'BUILDER',
      description: 'Lidera proyectos y mentoriza a otros en su journey Web3',
      icon: Heart,
      skills: ['Leadership', 'Mentoring', 'Project management'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  const resources = [
    {
      title: 'Laboratorios',
      description: 'Acceso a testnets y herramientas de desarrollo',
      features: ['Ethereum Testnet', 'Solana Devnet', 'Polygon Mumbai', 'Local blockchain'],
    },
    {
      title: 'Biblioteca',
      description: 'Documentación, videos y tutorials',
      features: ['Technical docs', 'Video courses', 'Code examples', 'Best practices'],
    },
    {
      title: 'Eventos',
      description: 'Workshops semanales y demos mensuales',
      features: ['Weekly workshops', 'Monthly demos', 'Networking events', 'Guest speakers'],
    },
    {
      title: 'Comunidad',
      description: 'Slack workspace privado',
      features: ['Private channels', 'Peer support', 'Mentor access', 'Job board'],
    },
  ];

  const faqs = [
    {
      question: '¿Es realmente gratis?',
      answer: 'Sí, nuestro programa de formación es completamente gratuito para builders. Nos financiamos a través de servicios B2B con empresas y protocolos.',
    },
    {
      question: '¿Qué nivel técnico necesito?',
      answer: 'Buscamos developers con al menos 1-2 años de experiencia en programación. No necesitas conocimiento previo en Web3, eso lo enseñamos.',
    },
    {
      question: '¿Cómo es el proceso de selección?',
      answer: 'Aplicación online + entrevista técnica + assessment motivacional. Buscamos tanto skills como fit cultural y ganas de aprender.',
    },
    {
      question: '¿Garantizan trabajo al final?',
      answer: 'No garantizamos empleo, pero sí te preparamos con portfolio, network y skills demandadas. Muchos graduates consiguen trabajo rápidamente.',
    },
    {
      question: '¿Puedo trabajar mientras estudio?',
      answer: 'El programa requiere dedicación significativa. Recomendamos tener flexibilidad laboral o estudiar en modalidad part-time.',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-blue-500/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-blue-500/10 text-blue-500 border-blue-500/20">
              Para Developers
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                Tu journey Web3 comienza aquí
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Programa intensivo y gratuito que te transforma de developer tradicional a Web3 builder con oportunidades reales de empleo
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
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
            <h2 className="text-4xl font-bold mb-6">Tu journey paso a paso</h2>
            <p className="text-xl text-muted-foreground">
              Un proceso estructurado que te lleva desde la aplicación hasta el job placement
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 opacity-30" />
            
            <div className="space-y-16">
              {journey.map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Builder Types */}
      <section className="py-24 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">¿Qué tipo de Builder eres?</h2>
            <p className="text-xl text-muted-foreground">
              Diferentes paths para diferentes perfiles, todos llevando al mismo objetivo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {builderTypes.map((type, index) => (
              <Card key={index} className={`group relative overflow-hidden bg-gradient-to-br ${type.color.replace('from-', 'from-').replace('to-', 'to-')}/5 border-0 hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${type.color} mb-6`}>
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold mb-4">{type.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{type.description}</p>
                  
                  <div className="space-y-2">
                    {type.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center text-xs">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Herramientas y recursos</h2>
            <p className="text-xl text-muted-foreground">
              Todo lo que necesitas para acelerar tu aprendizaje Web3
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">{resource.title}</h3>
                  <p className="text-muted-foreground mb-6">{resource.description}</p>
                  
                  <ul className="space-y-2">
                    {resource.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/10">
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
                    <label className="block text-sm font-medium mb-2">Nombre completo</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Experiencia técnica</label>
                  <Textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="Cuéntanos sobre tu background técnico, lenguajes, frameworks..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">¿Por qué Web3?</label>
                  <Textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                    placeholder="¿Qué te motiva a hacer el cambio a Web3?"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Portfolio/GitHub (opcional)</label>
                  <Input
                    value={formData.portfolio}
                    onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                    placeholder="https://github.com/tuusername"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  Enviar aplicación
                  <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="text-4xl font-bold mb-6">FAQ Builders</h2>
            <p className="text-xl text-muted-foreground">
              Respuestas a las preguntas más frecuentes
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}