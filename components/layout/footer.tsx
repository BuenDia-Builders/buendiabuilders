'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/providers/language-provider';
import {
  Github, Twitter, Linkedin, Mail, Calendar, Code, Users, Heart, ExternalLink, Instagram, Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// TikTok icon component (since it's not in lucide-react)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const communityLinks = [
    { label: t('footer.community.email'), href: 'mailto:hola@buendiabuilders.com', description: t('footer.community.email.desc'), status: 'active' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/buen-dia-builders/', description: t('footer.community.linkedin.desc'), status: 'online' },
    { label: 'Telegram', href: '#', description: t('footer.community.telegram.desc'), status: 'active' },
    { label: 'Discord', href: '#', description: t('footer.community.discord.desc'), status: 'online' },
  ];

  const resourceLinks = [
    { label: t('footer.resources.toolkit'), href: '#', isNew: true },
    { label: t('footer.resources.calendar'), href: 'https://luma.com/user/buendiabuilders' },
    { label: t('footer.resources.learning'), href: '#' },
  ];

  const aboutLinks = [
    { label: t('footer.about.story'), href: '#' },
    { label: t('footer.about.team'), href: '#' },
    { label: t('footer.about.press'), href: '#' },
  ];

  const connectLinks = [
    { label: t('footer.connect.application'), href: './builders#application-form' },
    { label: t('footer.connect.sponsors'), href: './blockchains#partnership-form', highlight: true },
    { label: t('footer.connect.contact'), href: 'mailto:buendiabuilders@gmail.com' },
  ];

  const socialLinks = [
    {
      icon: Twitter,
      href: 'https://x.com/buendiabuilders',
      label: 'X (Twitter)',
      description: t('footer.social.twitter.desc'),
      gradient: 'from-black to-gray-600'
    },
    {
      icon: Youtube,
      href: 'https://www.youtube.com/channel/UCHkKjB4IiLSj6z3XkqGbgkg',
      label: 'YouTube',
      description: t('footer.social.youtube.desc'),
      gradient: 'from-red-500 to-red-700'
    },
    {
      icon: Github,
      href: 'https://github.com/BuenDia-Builders',
      label: 'GitHub',
      description: t('footer.social.github.desc'),
      gradient: 'from-gray-700 to-gray-900'
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border text-foreground">
      {/* Newsletter Section */}
      <div className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
            {t('footer.newsletter.title')}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t('footer.newsletter.description')}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={t('footer.newsletter.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6"
            >
              <Mail className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-5 md:grid-cols-2 gap-8">
        {/* Comunidad */}
        <div>
          <h3 className="text-lg font-black mb-6 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
            {t('footer.community.title')}
          </h3>
          <div className="space-y-4">
            {communityLinks.map((link, index) => (
              <div key={index}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between group hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <span className="font-medium">{link.label}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 ml-2 mt-1" />
                </a>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${link.status === 'active' ? 'bg-green-500' :
                    link.status === 'online' ? 'bg-blue-500 animate-pulse' :
                      link.status === 'recent' ? 'bg-yellow-500' :
                        'bg-gray-400 dark:bg-gray-600'
                    }`} />
                  {link.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recursos */}
        <div>
          <h3 className="text-lg font-black mb-6 flex items-center">
            <Code className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" />
            {t('footer.resources.title')}
          </h3>
          <div className="space-y-4">
            {resourceLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group hover:text-green-500 dark:hover:text-green-400 transition-colors"
              >
                <span className="font-medium">{link.label}</span>
                {link.isNew && (
                  <span className="ml-2 px-2 py-0.5 bg-green-500 text-gray-900 dark:text-gray-100 rounded-full text-xs font-bold">
                    {t('footer.resources.coming')}
                  </span>
                )}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 ml-2" />
              </a>
            ))}
          </div>
        </div>

        {/* Nosotras */}
        <div>
          <h3 className="text-lg font-black mb-6 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-red-500 dark:text-red-400" />
            {t('footer.about.title')}
          </h3>
          <div className="space-y-4">
            {aboutLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium hover:text-red-500 dark:hover:text-red-400 group"
              >
                <span className="flex items-center">
                  {link.label}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 ml-2" />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Conecta */}
        <div>
          <h3 className="text-lg font-black mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
            {t('footer.connect.title')}
          </h3>
          <div className="space-y-4">
            {connectLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block font-medium group ${link.highlight ? 'text-purple-500 hover:text-purple-400' : 'hover:text-purple-500 dark:hover:text-purple-400'
                  }`}
              >
                <span className="flex items-center">
                  {link.label}
                  {link.highlight && (
                    <span className="ml-2 px-2 py-0.5 bg-purple-500 text-gray-900 dark:text-gray-100 rounded-full text-xs font-bold">
                      {t('footer.connect.hot')}
                    </span>
                  )}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 ml-2" />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-black mb-6 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-cyan-500 dark:text-cyan-400" />
            {t('footer.social.title')}
          </h3>
          <div className="space-y-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-3 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
                >
                  <div className={`w-8 h-8 bg-gradient-to-br ${social.gradient} rounded flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm group-hover:text-blue-500 dark:group-hover:text-blue-400">
                      {social.label}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {social.description}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <Link href="/" className="flex items-center space-x-4">
            <Image src="/LogoBDB.png" alt="Buen Día Builders" width={70} height={70} className="rounded-lg" />
            <div>
              <div className="font-bold text-lg dark:text-white">Buen Día Builders</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 italic">{t('footer.tagline')}</div>
            </div>
          </Link>

          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">{t('footer.legal.terms')}</Link>
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">{t('footer.legal.privacy')}</Link>
          </div>

          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span>{t('footer.made')}</span>
            <Heart className="w-4 h-4 text-red-500 dark:text-red-400 mx-1 animate-pulse" />
            <span>{t('footer.latam')}</span>
          </div>
        </div>

        <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}