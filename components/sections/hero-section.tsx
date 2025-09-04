'use client';

import { useLanguage } from '@/components/providers/language-provider';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Code2, Building2, Network } from 'lucide-react';
// import Link from 'next/link';

export function HeroSection() {
  const { t } = useLanguage();

  /*
  // --- Tarjetas de audiencias (desactivadas por ahora) ---
  const audiences = [
    {
      icon: Code2,
      title: t('hero.builder.title'),
      subtitle: t('hero.builder.subtitle'),
      href: '/builders',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      hoverGradient: 'hover:from-blue-500/20 hover:to-cyan-500/20',
    },
    {
      icon: Building2,
      title: t('hero.company.title'),
      subtitle: t('hero.company.subtitle'),
      href: '/empresas',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      hoverGradient: 'hover:from-purple-500/20 hover:to-pink-500/20',
    },
    {
      icon: Network,
      title: t('hero.blockchain.title'),
      subtitle: t('hero.blockchain.subtitle'),
      href: '/blockchains',
      gradient: 'from-teal-500 to-green-500',
      bgGradient: 'from-teal-500/10 to-green-500/10',
      hoverGradient: 'hover:from-teal-500/20 hover:to-green-500/20',
    },
  ];
  */

  return (
    <section className="relative pt-32 pb-8 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Content */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed">
            {t('hero.subtitle')}
          </p>
        </div>

        {/*
        // --- Grid de tarjetas (desactivado por ahora) ---
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <Link key={index} href={audience.href}>
              <Card className={`group relative overflow-hidden bg-gradient-to-br ${audience.bgGradient} border-0 transition-all duration-500 ${audience.hoverGradient} hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20`}>
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${audience.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <audience.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300">
                    {audience.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {audience.subtitle}
                  </p>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${audience.gradient} hover:shadow-lg hover:shadow-current/25 transition-all duration-300 text-white border-0`}
                  >
                    {audience.subtitle}
                  </Button>
                </CardContent>
                
                <div className={`absolute inset-0 bg-gradient-to-br ${audience.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              </Card>
            </Link>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}
