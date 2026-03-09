'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/components/providers/language-provider';
import { Twitter, Github, Linkedin, Youtube } from 'lucide-react';

// Telegram icon
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

export function Footer() {
  const { language } = useLanguage();
  const isEs = language === 'es';
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: Twitter, href: 'https://x.com/buendiabuilders', label: 'X' },
    { icon: TelegramIcon, href: 'https://t.me/ar3lisa', label: 'Telegram' },
    { icon: Github, href: 'https://github.com/BuenDia-Builders', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/buen-dia-builders/', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UCHkKjB4IiLSj6z3XkqGbgkg', label: 'YouTube' },
  ];

  const mainLinks = [
    { label: 'GitHub', href: 'https://github.com/BuenDia-Builders' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/buen-dia-builders/' },
    { label: isEs ? 'Nuestra Cultura' : 'Our Culture', href: '/culture' },
  ];

  return (
    <footer className="bg-background border-t border-border text-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1.3fr] gap-10 lg:gap-8">

        {/* Column 1: Logo + description + social icons */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-5">
            <Image src="/LogoBDB.png" alt="Buen Día Builders" width={50} height={50} />
            <span className="font-bold text-lg tracking-tight">Buen Día Builders</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
            {isEs
              ? 'Buen Día Builders es un hub de tecnologías emergentes en LATAM. Un espacio para builders, empresas y ecosistemas que quieren construir el futuro.'
              : 'Buen Día Builders is an emerging technologies hub in LATAM. A space for builders, companies and ecosystems that want to build the future.'}
          </p>
          <div className="flex items-center gap-2">
            {socialIcons.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="font-bold text-sm mb-5">Links</h3>
          <div className="space-y-3">
            {mainLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </div>

        {/* Column 3: Contact Us with QR + email */}
        <div>
          <h3 className="font-bold text-sm mb-5">Contact Us</h3>
          <div className="flex gap-6">
            {/* QR Code */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-28 h-28 rounded-lg border border-border overflow-hidden bg-white p-1">
                <Image
                  src="/qr-instagram.png"
                  alt="Instagram QR"
                  width={112}
                  height={112}
                  className="w-full h-full"
                />
              </div>
              <span className="text-xs text-muted-foreground mt-2">Official Instagram</span>
            </div>
            {/* Contact info */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Business: </span>
                <a href="mailto:buendiabuilders@gmail.com" className="text-blue-500 hover:text-blue-600 transition-colors">
                  buendiabuilders@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">
            Copyright &copy; {currentYear} Buen Día Builders
          </span>
        </div>
      </div>
    </footer>
  );
}
