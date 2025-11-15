'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { sendEmail } from '@/lib/email-service';
import { 
  Building2, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Target, 
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  DollarSign,
  Award,
  Loader2
} from 'lucide-react';
import { useState } from 'react';
import { supabase, type CompanyInquiry } from '@/lib/supabase';

export default function EmpresasPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    role: '',
    needs: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!formData.company || !formData.name || !formData.email || !formData.role || !formData.needs) {
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

      // Guardar en Supabase
      const { data, error } = await supabase
        .from('company_inquiries')
        .insert([{
          company: formData.company.trim(),
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role.trim(),
          needs: formData.needs.trim(),
        }])
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
        await sendEmail('empresas', {
          name: formData.name.trim(),
          company: formData.company.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role.trim(),
          needs: formData.needs.trim(),
        });
    } catch (emailError) {
          console.error('Error enviando email de confirmación:', emailError);
    }
    
    toast({
      title: `¡Gracias ${formData.name}!`,
      description: "Tu solicitud ha sido enviada correctamente. Te redirigimos a nuestro calendario para que puedas agendar la llamada. También recibirás un email de confirmación.",
    });

      // Limpiar formulario
      setFormData({
        company: '',
        name: '',
        email: '',
        role: '',
        needs: '',
      });

      // Redirigir al calendario (pequeño delay para ver el toast)
      setTimeout(() => {
        window.open('https://calendar.app.google/XqUmUcgMq8ozc8dD9', '_blank');
      }, 2000);

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

  const process = [
    {
      step: '01',
      title: t('companies.process.discovery'),
      description: t('companies.process.discovery.desc'),
      duration: t('companies.process.discovery.duration'),
      deliverable: t('companies.process.discovery.deliverable'),
    },
    {
      step: '02', 
      title: t('companies.process.proposal'),
      description: t('companies.process.proposal.desc'),
      duration: t('companies.process.proposal.duration'),
      deliverable: t('companies.process.proposal.deliverable'),
    },
    {
      step: '03',
      title: t('companies.process.execution'),
      description: t('companies.process.execution.desc'),
      duration: t('companies.process.execution.duration'),
      deliverable: t('companies.process.execution.deliverable'),
    },
    {
      step: '04',
      title: t('companies.process.followup'),
      description: t('companies.process.followup.desc'),
      duration: t('companies.process.followup.duration'),
      deliverable: t('companies.process.followup.deliverable'),
    },
  ];

  const talentPipeline = [
    {
      level: t('companies.talent.junior'),
      description: t('companies.talent.junior.desc'),
      skills: ['Blockchain basics', 'Smart contracts', 'Web3 fundamentals'],
      salary: '$40k-60k USD',
    },
    {
      level: t('companies.talent.mid'),
      description: t('companies.talent.mid.desc'),
      skills: ['protocolos DeFi', 'Full-stack Web3', 'Diseños de Sistemas'],
      salary: '$60k-90k USD',
    },
    {
      level: t('companies.talent.senior'),
      description: t('companies.talent.senior.desc'),
      skills: ['Diseño de protocolos', 'Liderazgo de equipos', 'Pensamiento estratégico'],
      salary: '$90k-150k USD',
    },
    {
      level: t('companies.talent.specialist'),
      description: t('companies.talent.specialist.desc'),
      skills: ['Experiencia en el dominio', 'Protocolos avanzados', 'Innovación'],
      salary: 'Market premium',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-purple-500/5 to-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-purple-500/10 text-purple-500 border-purple-500/20">
              {t('companies.page.badge')}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-clip-text text-transparent">
                {t('companies.page.title')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('companies.page.subtitle')}
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              {t('companies.page.cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-gradient-to-b from-muted/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('companies.process.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('companies.process.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="group text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-purple-500 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm">{step.duration}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {step.deliverable}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Pipeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('companies.talent.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('companies.talent.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {talentPipeline.map((profile, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-2">{profile.level}</h3>
                  
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {profile.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {profile.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        <span className="text-xs">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                {t('companies.form.title')}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('companies.form.subtitle')}
            </p>
          </div>

          <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-border/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('companies.form.company')}</label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder={t('companies.form.company.placeholder')}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('companies.form.name')}</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder={t('companies.form.name.placeholder')}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('companies.form.email')}</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder={t('companies.form.email.placeholder')}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('companies.form.role')}</label>
                    <Input
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder={t('companies.form.role.placeholder')}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t('companies.form.needs')}</label>
                  <Textarea
                    value={formData.needs}
                    onChange={(e) => setFormData({...formData, needs: e.target.value})}
                    placeholder={t('companies.form.needs.placeholder')}
                    rows={4}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('companies.form.submitting')}
                    </>
                  ) : (
                    <>
                      {t('companies.form.submit')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}