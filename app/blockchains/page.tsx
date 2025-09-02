'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  BarChart3
} from 'lucide-react';
import { useState } from 'react';

export default function BlockchainsPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    protocol: '',
    name: '',
    email: '',
    role: '',
    goals: '',
    budget: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Blockchain inquiry:', formData);
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
      phase: 'Protocol Deep Dive',
      description: 'Entendemos tu tech stack, tokenomics y roadmap',
      duration: '2 semanas',
      deliverable: 'Technical analysis',
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
        { name: 'Compound', logo: '🏛️', description: 'Lending protocol' },
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
        { name: 'The Sandbox', logo: '🏖️', description: 'Virtual worlds' },
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
              Para Blockchains
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Acelera la adopción de tu protocolo en LATAM
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Educación técnica, onboarding y community building para expandir tu ecosistema en la región más prometedora
            </p>
            <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
              Explorar partnership
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Programas para protocolos</h2>
            <p className="text-xl text-muted-foreground">
              Soluciones específicas para cada objetivo de expansion en LATAM
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className={`group relative overflow-hidden bg-gradient-to-br ${program.gradient.replace('from-', 'from-').replace('to-', 'to-')}/5 border-0 hover:shadow-xl transition-all duration-300`}>
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${program.gradient} mb-4`}>
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{program.title}</CardTitle>
                  <p className="text-muted-foreground">{program.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {program.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {program.pricing}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Más detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Nuestro approach</h2>
            <p className="text-xl text-muted-foreground">
              Metodología de 4 fases para garantizar el éxito de tu expansion
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-teal-500 via-blue-500 to-purple-500 opacity-30" />
            
            <div className="space-y-16">
              {methodology.map((phase, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
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
            <h2 className="text-4xl font-bold mb-6">Protocolos que trabajamos</h2>
            <p className="text-xl text-muted-foreground">
              Experiencia comprobada en diferentes verticales del ecosistema Web3
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
                      <div key={protocolIndex} className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
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

      {/* Metrics Dashboard */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Métricas y resultados</h2>
            <p className="text-xl text-muted-foreground">
              KPIs que importan para el crecimiento de tu protocolo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <BarChart3 className={`w-8 h-8 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                    <Badge className={`bg-gradient-to-r ${metric.color} text-white text-xs`}>
                      {metric.growth}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{metric.title}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Actual</span>
                      <span className="font-bold">{metric.value.toLocaleString()}</span>
                    </div>
                    
                    <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                    
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Target: {metric.target.toLocaleString()}</span>
                      <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Partnerships exitosos que han impulsado la adopción en LATAM
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerships.map((partnership, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{partnership.protocol}</h3>
                    <div className="flex space-x-1">
                      {[...Array(partnership.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <Badge className="mb-4 bg-teal-500/10 text-teal-500 border-teal-500/20">
                    {partnership.program}
                  </Badge>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{partnership.duration}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Results</h4>
                      <p className="text-muted-foreground text-sm">{partnership.results}</p>
                    </div>
                  </div>
                  
                  <blockquote className="border-l-4 border-teal-500 pl-4 italic text-sm text-muted-foreground mb-4">
                    {partnership.testimonial}
                  </blockquote>
                  
                  <p className="text-xs text-muted-foreground">— {partnership.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-24 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
                Exploremos un partnership
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
                    <label className="block text-sm font-medium mb-2">Protocolo/Proyecto</label>
                    <Input
                      value={formData.protocol}
                      onChange={(e) => setFormData({...formData, protocol: e.target.value})}
                      placeholder="Nombre de tu protocolo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tu nombre</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="tu@protocolo.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tu rol</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="DevRel, BD, etc."
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Objetivos en LATAM</label>
                  <Textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({...formData, goals: e.target.value})}
                    placeholder="¿Qué buscas lograr en la región? Developer adoption, community growth, partnerships..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Budget aproximado (USD)</label>
                  <Input
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="Rango de investment para el programa"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white"
                >
                  Solicitar programa customizado
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}