'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'María González',
    role: 'Senior Blockchain Developer',
    company: 'MercadoLibre',
    content: 'BdB me transformó de desarrolladora tradicional a líder Web3. El programa me conectó con oportunidades que nunca imaginé posibles.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
  {
    name: 'Carlos Rodriguez',
    role: 'CTO',
    company: 'TechLatam',
    content: 'Encontramos el talento Web3 que necesitábamos. Los builders de BdB llegaron con skills técnicos sólidos y mentalidad innovadora.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
  {
    name: 'Ana Silva',
    role: 'Protocol Lead',
    company: 'Stellar Development',
    content: 'BdB nos ayudó a acelerar la adopción en LATAM. Su comprensión del ecosistema local fue clave para nuestro éxito regional.',
    rating: 5,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              Casos de éxito
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Historias reales de builders, empresas y protocolos que han transformado su futuro con nosotros
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/50 border border-border/50 hover:border-purple-500/30 transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <Quote className="h-8 w-8 text-purple-500/60" />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-lg mb-6 leading-relaxed text-muted-foreground">
                  &quot;{testimonial.content}&quot;
                </blockquote>

                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}   
                      height={48}   
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>

              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}