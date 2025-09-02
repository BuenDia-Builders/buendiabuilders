'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const cities = [
  { name: 'Ciudad de México', country: 'México', active: true },
  { name: 'São Paulo', country: 'Brasil', active: true },
  { name: 'Buenos Aires', country: 'Argentina', active: true },
  { name: 'Bogotá', country: 'Colombia', active: true },
  { name: 'Santiago', country: 'Chile', active: false },
  { name: 'Lima', country: 'Perú', active: false },
  { name: 'Caracas', country: 'Venezuela', active: false },
  { name: 'Montevideo', country: 'Uruguay', active: false },
];

export function CitiesSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Interest submitted:', { email, city });
    setEmail('');
    setCity('');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              BdB en tu ciudad
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expandiendo el ecosistema Web3 por toda Latinoamérica, ciudad por ciudad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Cities Grid */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">
              Ciudades donde operamos
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {cities.map((cityData, index) => (
                <Card 
                  key={index}
                  className={`group transition-all duration-300 ${
                    cityData.active 
                      ? 'bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/30 hover:border-green-500/50' 
                      : 'bg-muted/30 border-border/50 hover:border-purple-500/30'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{cityData.name}</p>
                        <p className="text-sm text-muted-foreground">{cityData.country}</p>
                      </div>
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        cityData.active ? 'bg-green-500/20' : 'bg-muted'
                      }`}>
                        <MapPin className={`h-4 w-4 ${
                          cityData.active ? 'text-green-500' : 'text-muted-foreground'
                        }`} />
                      </div>
                    </div>
                    <div className={`mt-3 text-xs font-medium ${
                      cityData.active ? 'text-green-500' : 'text-orange-500'
                    }`}>
                      {cityData.active ? 'Activo' : 'Próximamente'}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Interest Form */}
          <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                ¿Tu ciudad no está en la lista?
              </h3>
              <p className="text-muted-foreground mb-8 text-center leading-relaxed">
                Regístrate y te contactaremos cuando BdB llegue a tu ciudad
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <Input
                    type="text"
                    placeholder="Tu ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  size="lg"
                >
                  Notificarme cuando esté disponible
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Te mantendremos informado sobre eventos y oportunidades en tu región
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}