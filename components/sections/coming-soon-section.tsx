'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import { Input } from '@/components/ui/input';
import { Twitter, Github, Linkedin, Send } from 'lucide-react';
import Image from 'next/image';

export function ComingSoonSection() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isEs = language === 'es';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', email);
    setEmail('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/buendiabuilders', label: 'X' },
    { icon: Github, href: 'https://github.com/BuenDia-Builders', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/buen-dia-builders/', label: 'LinkedIn' },
    { icon: Send, href: 'https://t.me/ar3lisa', label: 'Telegram' },
  ];

  return (
    <section className="min-h-screen flex items-stretch pt-16">
      {/* Left side - Image */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500">
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-white">
            <Image
              src="/LogoBDB.png"
              alt="Buen Día Builders"
              width={120}
              height={120}
              className="mb-8 drop-shadow-2xl"
            />
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 drop-shadow-lg">
              Buen Día Builders
            </h2>
            <p className="text-lg text-center text-white/80 max-w-md leading-relaxed">
              Building the Web ecosystem
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 bg-background">
        {/* Logo + social icons row (mobile: show logo) */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <Image
              src="/LogoBDB.png"
              alt="Buen Día Builders"
              width={45}
              height={45}
            />
            <span className="font-bold text-lg text-foreground tracking-tight">
              BUEN DÍA BUILDERS
            </span>
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-blue-500 hover:border-blue-500/30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Main text */}
        <div className="mb-12">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
            {isEs ? 'TODAVÍA ESTAMOS' : "WE'RE STILL"}
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-foreground">
            {isEs ? (
              <>
                Cocinando
                <br />
                el futuro.
              </>
            ) : (
              <>
                Baking
                <br />
                the cake.
              </>
            )}
          </h1>
        </div>

        {/* Email subscribe */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex items-center border-b-2 border-border pb-3 group focus-within:border-blue-500 transition-colors">
            <Input
              type="email"
              placeholder={isEs ? 'Ingresá tu email' : 'Enter your email address'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 border-0 shadow-none focus-visible:ring-0 px-0 text-base placeholder:text-muted-foreground/60 bg-transparent"
            />
            <button
              type="submit"
              className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors whitespace-nowrap ml-4 flex items-center gap-1"
            >
              {submitted
                ? (isEs ? '¡Listo!' : 'Done!')
                : (isEs ? 'Suscribirse' : 'Subscribe')}
              {!submitted && <span className="text-lg">→</span>}
            </button>
          </div>
        </form>

        <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-md">
          {isEs
            ? 'Una vez suscripto te avisamos cuando la plataforma esté lista. (Prometemos no compartir tu info.)'
            : "Once you're subscribed you will get an email when the platform is ready. (Promise we won't sell your information in the meantime.)"}
        </p>
      </div>
    </section>
  );
}
