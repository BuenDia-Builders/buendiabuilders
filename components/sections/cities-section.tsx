'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/email-service';
import { MapPin, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const cities = [
  { name: 'Buenos Aires', country: 'Argentina', active: true },
  { name: 'Pipa', country: 'Brasil', active: true },
  { name: 'Ciudad de México', country: 'México', active: false },
  { name: 'Lima', country: 'Perú', active: false },
  // { name: 'Bogotá', country: 'Colombia', active: false },
  // { name: 'Santiago', country: 'Chile', active: false },
  // { name: 'Caracas', country: 'Venezuela', active: false },
  // { name: 'Montevideo', country: 'Uruguay', active: false },
];

export function CitiesSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!email || !city) {
        toast({
          title: "Error de validación",
          description: "Por favor, completa todos los campos",
          variant: "destructive",
        });
        return;
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: "Email inválido",
          description: "Por favor, ingresa un email válido",
          variant: "destructive",
        });
        return;
      }

      // Insertar en Supabase
      const { data, error } = await supabase
        .from('city_interests')
        .insert([
          {
            email: email.trim().toLowerCase(),
            city: city.trim(),
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error al guardar:', error);
        toast({
          title: "Error al enviar",
          description: "Error al enviar la solicitud. Inténtalo de nuevo.",
          variant: "destructive",
        });
        return;
      }

      // Enviar email de confirmación
      try {
        await sendEmail('cities', {
          email: email.trim().toLowerCase(),
          city: city.trim(),
        });
      } catch (emailError) {
        console.error('Error enviando email de confirmación:', emailError);
      }

      toast({
        title: "¡Éxito!",
        description: "¡Solicitud enviada exitosamente! Te contactaremos cuando lleguemos a tu ciudad y recibirás un email de confirmación.",
      });

      // Limpiar formulario
      setEmail('');
      setCity('');

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

  return (
    <section className="py-16 bg-gradient-to-b from-muted/10 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              Buen día Builders en tu ciudad
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
                Regístrate y te contactaremos cuando Buen día Builders llegue a tu ciudad
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tu ciudad <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Tu ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Notificarme cuando esté disponible
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
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