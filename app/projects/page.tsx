'use client';

import { useLanguage } from '@/components/providers/language-provider';
import { Footer } from '@/components/layout/footer';
import { FolderOpen } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const { language } = useLanguage();
  const isEs = language === 'es';

  return (
    <div className="min-h-screen">
      <section className="min-h-[70vh] flex items-center justify-center pt-16">
        <div className="text-center px-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-purple-500/20 mb-8">
            <FolderOpen className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
            {isEs ? 'Proyectos' : 'Projects'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            {isEs ? 'Próximamente' : 'Coming soon'}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
            <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-sm text-yellow-500/80 font-medium">
              {isEs ? 'En construcción' : 'Under construction'}
            </span>
          </div>
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
