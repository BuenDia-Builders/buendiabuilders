import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { LanguageProvider } from '@/components/providers/language-provider';
import { Navbar } from '@/components/layout/navbar';
import { FloatingElements } from '@/components/ui/floating-elements';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Buen Día Builders - Ecosistema Web3 LATAM',
  description: 'Conectamos Builders, Empresas y Blockchains para crear el futuro Web3 en LATAM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider defaultLanguage="es">
            <ScrollProgress />
            <FloatingElements />
            <Navbar />
            <main className="relative z-10">
              {children}
            </main>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}