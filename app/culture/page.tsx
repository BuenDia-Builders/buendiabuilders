'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Footer } from '@/components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Lightbulb, Flame, Sparkles } from 'lucide-react';

export default function CulturePage() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  const values = [
    {
      icon: Heart,
      title: isEs ? 'Confianza radical' : 'Radical trust',
      description: isEs
        ? 'Creemos en las personas primero. No hay jerarquías rígidas, hay conversaciones honestas y decisiones compartidas.'
        : 'We believe in people first. No rigid hierarchies—just honest conversations and shared decisions.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Lightbulb,
      title: isEs ? 'Curiosidad como motor' : 'Curiosity as fuel',
      description: isEs
        ? 'Las mejores ideas nacen de preguntar "¿y si...?". Experimentamos, nos equivocamos y aprendemos rápido.'
        : 'The best ideas come from asking "what if...?". We experiment, fail, and learn fast.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Flame,
      title: isEs ? 'Hacer > Planear' : 'Do > Plan',
      description: isEs
        ? 'Preferimos un prototipo imperfecto a un plan perfecto. Construimos, iteramos y mejoramos sobre la marcha.'
        : 'We prefer an imperfect prototype over a perfect plan. We build, iterate, and improve as we go.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Sparkles,
      title: isEs ? 'Diversidad real' : 'Real diversity',
      description: isEs
        ? 'No es un slogan. Buscamos activamente voces diferentes, backgrounds distintos y perspectivas que desafíen lo establecido.'
        : 'It\'s not a slogan. We actively seek different voices, backgrounds, and perspectives that challenge the status quo.',
      gradient: 'from-purple-500 to-violet-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-blue-500 mb-4">
            {isEs ? 'NUESTRA CULTURA' : 'OUR CULTURE'}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-foreground">
            {isEs ? (
              <>No somos una empresa.<br />Somos un movimiento.</>
            ) : (
              <>We&apos;re not a company.<br />We&apos;re a movement.</>
            )}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {isEs
              ? 'Buen Día Builders nació de la convicción de que Latinoamérica tiene todo para liderar la próxima era tecnológica. Solo necesitamos construir los espacios correctos.'
              : 'Buen Día Builders was born from the conviction that Latin America has everything it takes to lead the next technological era. We just need to build the right spaces.'}
          </p>
        </div>
      </section>

      {/* About the founder */}
      <section className="py-16 px-6 bg-gradient-to-b from-blue-500/5 to-purple-500/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-black">
                ME
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1 text-foreground">Maria Elisa Araya</h2>
              <p className="text-blue-500 font-medium mb-4">Founder, Buen Día Builders</p>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {isEs
                    ? 'Soy de Argentina y llevo más de una década trabajando en la intersección de tecnología, innovación y comunidades. Pasé por el mundo corporativo, el ecosistema startup y la industria blockchain, siempre con una obsesión: ¿cómo hacemos para que más gente en LATAM pueda construir tecnología de punta?'
                    : 'I\'m from Argentina and I\'ve spent over a decade working at the intersection of technology, innovation, and communities. I\'ve been through the corporate world, the startup ecosystem, and the blockchain industry, always with one obsession: how do we get more people in LATAM building cutting-edge technology?'}
                </p>
                <p>
                  {isEs
                    ? 'Buen Día Builders es la respuesta a esa pregunta. No es solo un programa o una plataforma—es un espacio donde builders de toda la región pueden conectar, aprender y lanzar proyectos reales con tecnologías emergentes. Creo profundamente en el talento latinoamericano y en que las mejores cosas se construyen en comunidad.'
                    : 'Buen Día Builders is my answer to that question. It\'s not just a program or a platform—it\'s a space where builders from across the region can connect, learn, and launch real projects with emerging technologies. I deeply believe in Latin American talent and that the best things are built in community.'}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <a
                  href="https://www.linkedin.com/in/arayamariaelisa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors font-medium"
                >
                  LinkedIn &rarr;
                </a>
                <span className="text-border">|</span>
                <a
                  href="https://t.me/ar3lisa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors font-medium"
                >
                  Telegram &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            {isEs ? 'En qué creemos' : 'What we believe'}
          </h2>
          <p className="text-muted-foreground mb-12 max-w-xl">
            {isEs
              ? 'Estos no son valores de pared. Son las reglas con las que tomamos decisiones todos los días.'
              : 'These aren\'t wall values. They\'re the rules we make decisions by every day.'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-border hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${value.gradient} mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-6">
            {isEs
              ? '¿Te identificás con esta forma de construir?'
              : 'Do you identify with this way of building?'}
          </p>
          <a
            href="mailto:buendiabuilders@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            {isEs ? 'Hablemos' : 'Let\'s talk'} &rarr;
          </a>
          <div className="mt-8">
            <Link href="/" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
              &larr; {isEs ? 'Volver al inicio' : 'Back to home'}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
