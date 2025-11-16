'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Code2,
  Rocket,
  Users,
  BookOpen,
  Award,
  ArrowUp,
  Calendar,
  ExternalLink,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle2,
  Clock,
  Sparkles,
  Heart
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function BuildersPage() {
  const { t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const journey = [
    {
      phase: t('builders.journey.application'),
      title: t('builders.journey.application.title'),
      description: t('builders.journey.application.desc'),
      icon: Code2,
      gradient: 'from-blue-500 to-cyan-500',
      duration: t('builders.journey.application.duration'),
      dates: t('builders.journey.application.dates'),
    },
    {
      phase: t('builders.journey.selection'),
      title: t('builders.journey.selection.title'),
      description: t('builders.journey.selection.desc'),
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      duration: t('builders.journey.selection.duration'),
      dates: t('builders.journey.selection.dates'),
    },
    {
      phase: t('builders.journey.program'),
      title: t('builders.journey.program.title'),
      description: t('builders.journey.program.desc'),
      icon: BookOpen,
      gradient: 'from-teal-500 to-green-500',
      duration: t('builders.journey.program.duration'),
      dates: t('builders.journey.program.dates'),
    },
    {
      phase: t('builders.journey.retreat'),
      title: t('builders.journey.retreat.title'),
      description: t('builders.journey.retreat.desc'),
      icon: Rocket,
      gradient: 'from-orange-500 to-red-500',
      duration: t('builders.journey.retreat.duration'),
      dates: t('builders.journey.retreat.dates'),
    },
    {
      phase: t('builders.journey.bootcamp'),
      title: t('builders.journey.bootcamp.title'),
      description: t('builders.journey.bootcamp.desc'),
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      duration: t('builders.journey.bootcamp.duration'),
      dates: t('builders.journey.bootcamp.dates'),
    },
    {
      phase: t('builders.journey.hackathon'),
      title: t('builders.journey.hackathon.title'),
      description: t('builders.journey.hackathon.desc'),
      icon: Code2,
      gradient: 'from-cyan-500 to-blue-500',
      duration: t('builders.journey.hackathon.duration'),
      dates: t('builders.journey.hackathon.dates'),
    },
    {
      phase: t('builders.journey.graduation'),
      title: t('builders.journey.graduation.title'),
      description: t('builders.journey.graduation.desc'),
      icon: Award,
      gradient: 'from-yellow-500 to-orange-500',
      duration: t('builders.journey.graduation.duration'),
      dates: t('builders.journey.graduation.dates'),
    },
  ];

  const stats = [
    { number: '200+', label: t('builders.stats.applications'), icon: Users },
    { number: '7', label: t('builders.stats.weeks'), icon: Calendar },
    { number: '100%', label: t('builders.stats.free'), icon: CheckCircle2 },
    { number: '20', label: t('builders.stats.scholarships'), icon: Rocket },
  ];

  const faqs = [
    {
      question: t('builders.faq.q1'),
      answer: t('builders.faq.a1'),
    },
    {
      question: t('builders.faq.q2'),
      answer: t('builders.faq.a2'),
    },
    {
      question: t('builders.faq.q3'),
      answer: t('builders.faq.a3'),
    },
    {
      question: t('builders.faq.q4'),
      answer: t('builders.faq.a4'),
    },
    {
      question: t('builders.faq.q5'),
      answer: t('builders.faq.a5'),
    },
    {
      question: t('builders.faq.q6'),
      answer: t('builders.faq.a6'),
    },
  ];

  const socialLinks = [
    { name: 'Twitter/X', icon: Twitter, url: 'https://x.com/buendiabuilders' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/buen-dia-builders' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/buendia_builders/' },
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-blue-500/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-orange-500/10 text-orange-500 border-orange-500/20">
              <Clock className="w-4 h-4 mr-2 inline" />
              {t('builders.page.badge')}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                {t('builders.page.title')}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              {t('builders.page.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              <Heart className="inline w-5 h-5 text-pink-500 mr-2" />
              {t('builders.page.thanks')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('builders.stats.title')}</h2>
            <p className="text-muted-foreground">{t('builders.stats.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('builders.journey.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('builders.journey.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500 opacity-30" />

            <div className="space-y-16">
              {journey.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border-border/50">
                      <CardContent className="p-8">
                        <Badge className={`mb-4 bg-gradient-to-r ${step.gradient} text-white`}>
                          {step.phase}
                        </Badge>
                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <p className="font-medium text-purple-500">{t('builders.journey.duration.label')} {step.duration}</p>
                          <p className="font-semibold text-blue-500">{step.dates}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 text-purple-500" />
          <h2 className="text-3xl font-bold mb-6">{t('builders.social.title')}</h2>
          <p className="text-lg text-muted-foreground mb-4">
            {t('builders.social.subtitle')}
          </p>
          <p className="text-muted-foreground mb-8">
            {t('builders.social.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="lg"
                className="hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
                onClick={() => window.open(social.url, '_blank')}
              >
                <social.icon className="mr-2 h-5 w-5" />
                {social.name}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Future Editions CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-border/50">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {t('builders.future.title')}
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('builders.future.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">
                  {t('builders.future.announcement')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">{t('builders.faq.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('builders.faq.subtitle')}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border rounded-lg hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-semibold hover:bg-muted/30 transition">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}