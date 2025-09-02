'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Code2, Building2, Network, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AudiencesSection() {
  const { t } = useLanguage();

  const sections = [
    {
      icon: Code2,
      title: t('builders.title'),
      description: t('builders.description'),
      cta: t('builders.cta'),
      href: '/builders',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/5 to-cyan-500/5',
    },
    {
      icon: Building2,
      title: t('companies.title'),
      description: t('companies.description'),
      cta: t('companies.cta'),
      href: '/empresas',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-500/5 to-pink-500/5',
    },
    {
      icon: Network,
      title: t('blockchains.title'),
      description: t('blockchains.description'),
      cta: t('blockchains.cta'),
      href: '/blockchains',
      gradient: 'from-teal-500 to-green-500',
      bgGradient: 'from-teal-500/5 to-green-500/5',
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {sections.map((section, index) => (
            <Card 
              key={index}
              className={`group relative overflow-hidden bg-gradient-to-br ${section.bgGradient} border-0 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10`}
            >
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${section.gradient} mb-6`}>
                      <section.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                      <span className={`bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
                        {section.title}
                      </span>
                    </h3>
                    
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {section.description}
                    </p>
                    
                    <Link href={section.href}>
                      <Button 
                        className={`group bg-gradient-to-r ${section.gradient} hover:shadow-lg hover:shadow-current/25 transition-all duration-300 text-white`}
                        size="lg"
                      >
                        {section.cta}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="relative">
                    <div className={`w-full h-64 rounded-lg bg-gradient-to-br ${section.gradient} opacity-20 blur-3xl`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <section.icon className={`w-32 h-32 text-transparent bg-gradient-to-r ${section.gradient} bg-clip-text opacity-30`} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}