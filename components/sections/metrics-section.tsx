'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Building, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Metric {
  icon: any;
  value: string;
  label: string;
  gradient: string;
}

function CounterAnimation({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    
    const updateCount = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function MetricsSection() {
  const { t } = useLanguage();

  const metrics: Metric[] = [
    {
      icon: Users,
      value: '500+',
      label: t('metrics.builders'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Building,
      value: '50+',
      label: t('metrics.companies'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      value: '+3.6%',
      label: t('metrics.growth'),
      gradient: 'from-teal-500 to-green-500',
    },
    {
      icon: Zap,
      value: '33+',
      label: t('metrics.funding'),
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/50 border border-border/50 hover:border-purple-500/30 transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${metric.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                  {metric.value}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.label}
                </p>
              </CardContent>
              
              {/* Subtle hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}