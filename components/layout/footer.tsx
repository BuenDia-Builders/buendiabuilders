'use client';

import { useLanguage } from '@/components/providers/language-provider';
import Link from 'next/link';
import { Code2, Twitter, Github, Linkedin, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const footerSections = [
    {
      title: t('footer.community'),
      links: [
        { label: t('footer.builders.nav'), href: '/builders' },
        { label: t('footer.companies.nav'), href: '/empresas' },
        { label: t('footer.blockchains.nav'), href: '/blockchains' },
      ],
    },
    {
      title: t('footer.resources'),
      links: [
        { label: t('footer.blog'), href: '/blog' },
        { label: t('footer.docs'), href: '/docs' },
        { label: t('footer.tutorials'), href: '/tutorials' },
      ],
    },
    {
      title: t('footer.company'),
      links: [
        { label: t('footer.about'), href: '/about' },
        { label: t('footer.careers'), href: '/careers' },
        { label: t('footer.contact'), href: '/contact' },
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        { label: t('footer.privacy'), href: '/privacy' },
        { label: t('footer.terms'), href: '/terms' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/buendiabuilders', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/buendiabuilders', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/buendiabuilders', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/@buendiabuilders', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border/50">
      {/* Newsletter Section */}
      <div className="py-16 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
                {t('footer.newsletter')}
              </span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Recibe las últimas novedades del ecosistema Web3 en LATAM
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Logo & Description */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <Code2 className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Buen Día Builders
                </span>
              </Link>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Conectamos el talento Web3 más prometedor de Latinoamérica con las oportunidades que definirán el futuro digital descentralizado.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-purple-500/20 hover:text-purple-500 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-purple-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-8 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-center md:text-left">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-purple-500 transition-colors text-sm">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-purple-500 transition-colors text-sm">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}