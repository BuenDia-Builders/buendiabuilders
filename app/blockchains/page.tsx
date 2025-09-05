'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/email-service';
import { 
  Network, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Target, 
  Zap, 
  Award, 
  BarChart3,
  ArrowUp,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, type BlockchainInquiry } from '@/lib/supabase';

export default function BlockchainsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    protocol: '',
    name: '',
    email: '',
    role: '',
    goals: '',
    budget: '',
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
      if (!formData.protocol || !formData.name || !formData.email || !formData.role || !formData.goals) {
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

      // Insertar en Supabase
      const { data, error } = await supabase
        .from('blockchain_inquiries')
        .insert([
          {
            protocol: formData.protocol.trim(),
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            role: formData.role.trim(),
            goals: formData.goals.trim(),
            budget: formData.budget.trim() || null,
          }
        ])
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
        await sendEmail('blockchains', {
          name: formData.name.trim(),
          protocol: formData.protocol.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role.trim(),
          goals: formData.goals.trim(),
          budget: formData.budget.trim() || null,
        });
      } catch (emailError) {
        console.error('Error enviando email de confirmación:', emailError);
      }

      toast({
        title: "¡Éxito!",
        description: "¡Consulta enviada exitosamente! Te contactaremos pronto y recibirás un email de confirmación.",
      });

      // Limpiar formulario
      setFormData({
        protocol: '',
        name: '',
        email: '',
        role: '',
        goals: '',
        budget: '',
      });


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

  // Function to scroll to form section
  const scrollToForm = () => {
    const formSection = document.getElementById('partnership-form');
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

  const programs = [
    {
      title: 'Technical Onboarding',
      description: 'Curriculum específico y labs prácticos con tu tooling',
      icon: BookOpen,
      features: [
        'Curriculum específico de tu protocol',
        'Labs prácticos con tu tooling',
        'Documentation en español',
        'Developer certification program',
      ],
      pricing: '$10k-30k por protocolo',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Community Building',
      description: 'Regional ambassador program y local engagement',
      icon: Users,
      features: [
        'Regional ambassador program',
        'Local meetups y eventos',
        'Social media strategy LATAM',
        'Influencer partnerships',
      ],
      pricing: '$5k-15k mensual',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Educational Marketing',
      description: 'Content creation técnico y workshop series',
      icon: Target,
      features: [
        'Content creation técnico',
        'Video tutorials específicos',
        'Workshop series regionales',
        'Conference speaking',
      ],
      pricing: '$3k-8k por evento',
      gradient: 'from-teal-500 to-green-500',
    },
    {
      title: 'Developer Relations',
      description: 'Office hours, support directo y hackathon sponsorship',
      icon: Zap,
      features: [
        'Office hours con tu team',
        'Direct support channels',
        'Bug bounty coordination',
        'Hackathon sponsorship',
      ],
      pricing: 'Equity considerations',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const methodology = [
    {
      phase: 'Análisis profundo del protocolo',
      description: 'Entendemos tu grupo de aplicaciones, tokenomics y hoja de ruta.',
      duration: '2 semanas',
      deliverable: 'Análisis técnico',
    },
    {
      phase: 'Curriculum Design',
      description: 'Programa educativo customizado para tu protocolo',
      duration: '3 semanas',
      deliverable: 'Custom curriculum',
    },
    {
      phase: 'Execution & Delivery',
      description: 'Training delivery + community building execution',
      duration: '12-24 semanas',
      deliverable: 'Trained developers',
    },
    {
      phase: 'Metrics & Optimization',
      description: 'KPIs tracking y optimización continua',
      duration: 'Ongoing',
      deliverable: 'Performance reports',
    },
  ];

  const protocols = [
    {
      category: 'Layer 1s',
      items: [
        { name: 'Ethereum', logo: '🔷', description: 'Smart contracts leader' },
        { name: 'Solana', logo: '🔥', description: 'High performance blockchain' },
        { name: 'Stellar', logo: '⭐', description: 'Cross-border payments' },
        { name: 'Polygon', logo: '🔺', description: 'Ethereum scaling' },
      ],
    },
    {
      category: 'DeFi',
      items: [
        { name: 'Uniswap', logo: '🦄', description: 'DEX protocol' },
        { name: 'Compound', logo: '🛏️', description: 'Lending protocol' },
        { name: 'Synthetix', logo: '⚡', description: 'Synthetic assets' },
        { name: 'Chainlink', logo: '🔗', description: 'Oracle network' },
      ],
    },
    {
      category: 'Infrastructure',
      items: [
        { name: 'The Graph', logo: '📊', description: 'Indexing protocol' },
        { name: 'Filecoin', logo: '📁', description: 'Decentralized storage' },
        { name: 'IPFS', logo: '🌐', description: 'Distributed web' },
        { name: 'ENS', logo: '🏷️', description: 'Domain names' },
      ],
    },
    {
      category: 'Gaming',
      items: [
        { name: 'Immutable X', logo: '🎮', description: 'Gaming NFTs' },
        { name: 'Axie Infinity', logo: '🐾', description: 'Play-to-earn' },
        { name: 'The Sandbox', logo: '🖥️', description: 'Virtual worlds' },
        { name: 'Enjin', logo: '💎', description: 'Gaming platform' },
      ],
    },
  ];

  const metrics = [
    {
      title: 'Developers Onboarded',
      value: 1500,
      target: 2000,
      growth: '+25%',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Active Users Growth',
      value: 850,
      target: 1200,
      growth: '+40%',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Transaction Volume',
      value: 75,
      target: 100,
      growth: '+85%',
      color: 'from-teal-500 to-green-500',
    },
    {
      title: 'Community Engagement',
      value: 92,
      target: 100,
      growth: '+15%',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const partnerships = [
    {
      protocol: 'Stellar',
      program: 'Stellar Builders LATAM',
      duration: '12 meses',
      results: '200+ developers trained, 15 projects launched',
      testimonial: '"BdB was instrumental in our LATAM expansion strategy."',
      author: 'Head of Developer Relations, Stellar',
      rating: 5,
    },
    {
      protocol: 'Polygon',
      program: 'Polygon Academy LATAM',
      duration: '8 meses',
      results: '150+ developers certified, 25% increase in dApps',
      testimonial: '"The regional expertise made all the difference."',
      author: 'DevRel Lead, Polygon',
      rating: 5,
    },
    {
      protocol: 'Chainlink',
      program: 'Oracle Developer Program',
      duration: '6 meses',
      results: '100+ oracle implementations, strong community growth',
      testimonial: '"BdB delivered beyond our expectations."',
      author: 'Community Manager, Chainlink',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-teal-500/5 to-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-teal-500/10 text-teal-500 border-teal-500/20">
              Para Blockchains y Protocolos
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Acelera la adopción de tu protocolo en LATAM
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Educación técnica, incorporación y desarrollo de comunidad para expandir tu ecosistema en la región más prometedora
            </p>
            <Button
              size="lg"
              onClick={scrollToForm}
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
            >
              Explorar nuestras alianzas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Nuestro enfoque</h2>
            <p className="text-xl text-muted-foreground">
              Metodología de 4 fases para garantizar el éxito de tu expansion
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-teal-500 via-blue-500 to-purple-500 opacity-30" />
            <div className="space-y-16">
              {methodology.map((phase, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? 'pr-8' : 'pl-8'
                    }`}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-8">
                        <Badge className="mb-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                          Fase {index + 1}
                        </Badge>
                        <h3 className="text-2xl font-bold mb-4">{phase.phase}</h3>
                        <p className="text-muted-foreground mb-4">{phase.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-purple-500 font-medium">{phase.duration}</span>
                          <Badge variant="outline">{phase.deliverable}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">{index + 1}</span>
                    </div>
                  </div>
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Protocols */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Protocolos en que desarrollamos</h2>
            <p className="text-xl text-muted-foreground">
              Experiencia técnica en diferentes verticales del ecosistema Web3
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {protocols.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-center">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((protocol, protocolIndex) => (
                      <div
                        key={protocolIndex}
                        className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <span className="text-2xl mr-3">{protocol.logo}</span>
                        <div>
                          <p className="font-semibold text-sm">{protocol.name}</p>
                          <p className="text-xs text-muted-foreground">{protocol.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section id="partnership-form" className="py-24 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                Exploremos nuestra alianza
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Cuéntanos sobre tu protocolo y objetivos en LATAM
            </p>
          </div>
          <Card className="bg-gradient-to-br from-teal-500/5 to-blue-500/5 border-border/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Protocolo/Proyecto <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.protocol}
                      onChange={(e) => setFormData({ ...formData, protocol: e.target.value })}
                      placeholder="Nombre de tu protocolo"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tu nombre <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@protocolo.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tu rol <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="DevRel, BD, etc."
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Objetivos en LATAM <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    placeholder="¿Qué buscas lograr en la región? Developer adoption, community growth, partnerships..."
                    rows={4}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget aproximado (USD)</label>
                  <Input
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="Rango de investment para el programa"
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar programa customizado
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}