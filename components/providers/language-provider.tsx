'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navbar
    'nav.builders': 'Desarrolladoras',
    'nav.empresas': 'Empresas',
    'nav.blockchains': 'Blockchains',
    'nav.recursos': 'Recursos',
    'nav.join': 'Iniciar Sesión',
    'nav.dashboard': 'Dashboard',

    // Hero Section
    "hero.title": "Conectamos desarrolladoras, empresas, blockchains y protocolos para impulsar el futuro Web3 en LATAM",
    "hero.subtitle": "Buen día Builders es el lugar donde desarrolladoras construyen el ecosistema Web3 más vibrante de Latinoamérica.",

    "hero.builder.title": "Soy creadora",
    "hero.builder.subtitle": "Empieza tu camino Web3",

    "hero.company.title": "Soy empresa",
    "hero.company.subtitle": "Encuentra talento Web3",

    "hero.blockchain.title": "Soy blockchain",
    "hero.blockchain.subtitle": "Haz crecer tu protocolo con BdB",

    // Metrics
    'metrics.builders': 'Builders Activos en el Sistema',
    'metrics.companies': 'Empresas Vinculadas',
    'metrics.growth': 'Crecimiento anual de Graduados entre 2023',
    'metrics.funding': 'Nuevos Activos como Asset Crypto',

    // Main Sections
    'builders.title': 'Conectamos builders con ideas y oportunidades',
    'builders.description': 'Desde una educación especializada, pasamos al ecosistema donde tu futuro profesional puede crecer, aprender y conectarse con las mejores oportunidades.',
    'builders.cta': 'Quiero ser Builder',

    'companies.title': 'El talento Web3 que tu empresa necesita',
    'companies.description': 'Reclutamiento especializado, capacitación y consultoría estratégica para acelerar la transformación Web3 de tu organización.',
    'companies.cta': 'Contratar talento',

    'blockchains.title': 'Acelera la adopción de tu protocolo en LATAM',
    'blockchains.description': 'Educación técnica, onboarding y community building para expandir tu ecosistema en la región más prometedora.',
    'blockchains.cta': 'Expandir protocolo',

    // How to Participate
    'participate.title': 'Cómo se puede participar',
    'participate.subtitle': 'Un journey estructurado que te llevará desde las bases hasta proyectos reales en el ecosistema Web3.',
    'participate.apply.title': 'APLICAR',
    'participate.apply.description': 'Completa tu aplicación y demuestra tu motivación por el mundo Web3.',
    'participate.apply.cta': 'Aplicar ahora',
    'participate.join.title': 'UNIRSE',
    'participate.join.description': 'Accede a nuestra comunidad privada y comienza tu formación.',
    'participate.join.cta': 'Unirse ahora',
    'participate.build.title': 'PARTICIPAR',
    'participate.build.description': 'Desarrolla proyectos reales con mentorías y feedback constante.',
    'participate.build.cta': 'Comenzar proyecto',

    // What is Builder
    'what.title': '¿Qué es ser Builder?',
    'what.subtitle': 'Ser Builder es más que programar: es liderar la transformación hacia una era digital más descentralizada.',
    'what.explorer.title': 'EXPLORADOR WEB3',
    'what.explorer.description': 'Curioso por naturaleza, siempre en busca de las últimas innovaciones.',
    'what.solver.title': 'SOLUCIONADOR',
    'what.solver.description': 'Encuentra soluciones creativas a problemas complejos del ecosistema.',
    'what.creator.title': 'CREADOR',
    'what.creator.description': 'Construye herramientas y aplicaciones que impactan positivamente.',
    'what.builder.title': 'BUILDER',
    'what.builder.description': 'Lidera proyectos y mentoriza a otros en su journey Web3.',

    // Explorer Stage
    'explorer.title': 'Etapa EXPLORADORA WEB3',
    'explorer.subtitle': 'Fundamentos y bases',
    'explorer.basic.title': 'Lo que harás',
    'explorer.basic.item1': 'Fundamentos de blockchain y criptografía',
    'explorer.basic.item2': 'Introducción a smart contracts',
    'explorer.basic.item3': 'Herramientas de desarrollo básicas',
    'explorer.basic.item4': 'Proyectos prácticos iniciales',
    'explorer.advanced.title': 'Lo que lograrás',
    'explorer.advanced.item1': 'Comprensión sólida del ecosistema Web3',
    'explorer.advanced.item2': 'Capacidad de análisis técnico',
    'explorer.advanced.item3': 'Primeras implementaciones funcionales',
    'explorer.advanced.item4': 'Red de contactos inicial en la comunidad',
    'explorer.cta': 'Comenzar journey',

    // Commitment
    'commitment.title': 'Redefiniendo el ecosistema Web3:',
    'commitment.subtitle': 'Nuestro compromiso',
    'commitment.description': 'Construimos el "Talento de nuevo tipo" para las organizaciones y el talento, impulsando la transformación más significativa que enfrentamos para las próximas generaciones.',
    'commitment.active.title': 'Nuevos Activos en Tu Curso',
    'commitment.active.value': '<2%',
    'commitment.performance.title': 'Rendimiento Promedio',
    'commitment.performance.value': '~1%',
    'commitment.growth.title': 'Crecimiento anual de Graduados entre 2023',
    'commitment.growth.value': '+3.6%',
    'commitment.future.title': 'Nuestro Futuro como Asset Crypto',
    'commitment.future.value': '33+',

    // Strategy
    'strategy.title': 'Nuestra estrategia para un impacto duradero',
    'strategy.description': 'Tres pilares fundamentales que garantizan el éxito de nuestros builders y el crecimiento del ecosistema.',
    'strategy.education.title': 'Educación Especializada',
    'strategy.education.description': 'Curriculum actualizado con las últimas tecnologías y mejores prácticas del ecosistema Web3.',
    'strategy.network.title': 'Network y Mentorías',
    'strategy.network.description': 'Conexiones directas con líderes de la industria y oportunidades de networking efectivo.',
    'strategy.practice.title': 'Proyectos Reales',
    'strategy.practice.description': 'Experiencia práctica construyendo soluciones que impactan en organizaciones reales.',
    'strategy.cta': 'Ver metodología',

    // Footer
    'footer.community': 'Comunidad',
    'footer.builders.nav': 'Builders',
    'footer.companies.nav': 'Empresas',
    'footer.blockchains.nav': 'Blockchains',
    'footer.resources': 'Recursos',
    'footer.blog': 'Blog',
    'footer.docs': 'Documentación',
    'footer.tutorials': 'Tutoriales',
    'footer.company': 'Empresa',
    'footer.about': 'Acerca de',
    'footer.careers': 'Carreras',
    'footer.contact': 'Contacto',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.socials': 'Síguenos en redes',
    'footer.newsletter': 'Para ponerse al día',
    'footer.copyright': '2025 Buen Día Builders. Construyendo el futuro Web3 en LATAM.',
  },
  en: {
    // Navbar
    'nav.builders': 'Builders',
    'nav.empresas': 'Companies',
    'nav.blockchains': 'Blockchains',
    'nav.recursos': 'Resources',
    'nav.join': 'Loguin',
    'nav.dashboard': 'Dashboard',

    // Hero Section  
    'hero.title': 'Connecting Builders, Companies and Blockchains to create Web3\'s future in LATAM',
    'hero.subtitle': 'The space where developers join the construction of Latin America\'s most dynamic Web3 ecosystem.',
    'hero.builder.title': 'I\'m a Builder',
    'hero.builder.subtitle': 'Start your Builder journey',
    'hero.company.title': 'I\'m a Company',
    'hero.company.subtitle': 'Connect with Web3 talent',
    'hero.blockchain.title': 'I\'m a Blockchain',
    'hero.blockchain.subtitle': 'Scale your protocol with BdB',

    // Metrics
    'metrics.builders': 'Active Builders in the System',
    'metrics.companies': 'Connected Companies',
    'metrics.growth': 'Annual Growth of Graduates between 2023',
    'metrics.funding': 'New Assets as Crypto Asset',

    // Main Sections
    'builders.title': 'Connecting builders with ideas and opportunities',
    'builders.description': 'From specialized education, we move to the ecosystem where your professional future can grow, learn and connect with the best opportunities.',
    'builders.cta': 'Become a Builder',

    'companies.title': 'The Web3 talent your company needs',
    'companies.description': 'Specialized recruitment, training and strategic consulting to accelerate your organization\'s Web3 transformation.',
    'companies.cta': 'Hire talent',

    'blockchains.title': 'Accelerate your protocol adoption in LATAM',
    'blockchains.description': 'Technical education, onboarding and community building to expand your ecosystem in the most promising region.',
    'blockchains.cta': 'Expand protocol',

    // How to Participate
    'participate.title': 'How to participate',
    'participate.subtitle': 'A structured journey that will take you from basics to real projects in the Web3 ecosystem.',
    'participate.apply.title': 'APPLY',
    'participate.apply.description': 'Complete your application and demonstrate your motivation for the Web3 world.',
    'participate.apply.cta': 'Apply now',
    'participate.join.title': 'JOIN',
    'participate.join.description': 'Access our private community and start your training.',
    'participate.join.cta': 'Join now',
    'participate.build.title': 'PARTICIPATE',
    'participate.build.description': 'Develop real projects with mentoring and constant feedback.',
    'participate.build.cta': 'Start project',

    // What is Builder
    'what.title': 'What does it mean to be a Builder?',
    'what.subtitle': 'Being a Builder is more than programming: it\'s leading the transformation towards a more decentralized digital era.',
    'what.explorer.title': 'WEB3 EXPLORER',
    'what.explorer.description': 'Curious by nature, always looking for the latest innovations.',
    'what.solver.title': 'PROBLEM SOLVER',
    'what.solver.description': 'Finds creative solutions to complex ecosystem problems.',
    'what.creator.title': 'CREATOR',
    'what.creator.description': 'Builds tools and applications that impact positively.',
    'what.builder.title': 'BUILDER',
    'what.builder.description': 'Leads projects and mentors others in their Web3 journey.',

    // Explorer Stage
    'explorer.title': 'WEB3 EXPLORER Stage',
    'explorer.subtitle': 'Fundamentals and foundations',
    'explorer.basic.title': 'What you\'ll do',
    'explorer.basic.item1': 'Blockchain and cryptography fundamentals',
    'explorer.basic.item2': 'Introduction to smart contracts',
    'explorer.basic.item3': 'Basic development tools',
    'explorer.basic.item4': 'Initial practical projects',
    'explorer.advanced.title': 'What you\'ll achieve',
    'explorer.advanced.item1': 'Solid understanding of Web3 ecosystem',
    'explorer.advanced.item2': 'Technical analysis capability',
    'explorer.advanced.item3': 'First functional implementations',
    'explorer.advanced.item4': 'Initial contact network in the community',
    'explorer.cta': 'Start journey',

    // Commitment
    'commitment.title': 'Redefining the Web3 ecosystem:',
    'commitment.subtitle': 'Our commitment',
    'commitment.description': 'We build the "New type of Talent" for organizations and talent, driving the most significant transformation we face for the next generations.',
    'commitment.active.title': 'New Assets in Your Course',
    'commitment.active.value': '<2%',
    'commitment.performance.title': 'Average Performance',
    'commitment.performance.value': '~1%',
    'commitment.growth.title': 'Annual Growth of Graduates between 2023',
    'commitment.growth.value': '+3.6%',
    'commitment.future.title': 'Our Future as Crypto Asset',
    'commitment.future.value': '33+',

    // Strategy
    'strategy.title': 'Our strategy for lasting impact',
    'strategy.description': 'Three fundamental pillars that guarantee the success of our builders and ecosystem growth.',
    'strategy.education.title': 'Specialized Education',
    'strategy.education.description': 'Updated curriculum with the latest technologies and best practices of the Web3 ecosystem.',
    'strategy.network.title': 'Network & Mentoring',
    'strategy.network.description': 'Direct connections with industry leaders and effective networking opportunities.',
    'strategy.practice.title': 'Real Projects',
    'strategy.practice.description': 'Practical experience building solutions that impact real organizations.',
    'strategy.cta': 'View methodology',

    // Footer
    'footer.community': 'Community',
    'footer.builders.nav': 'Builders',
    'footer.companies.nav': 'Companies',
    'footer.blockchains.nav': 'Blockchains',
    'footer.resources': 'Resources',
    'footer.blog': 'Blog',
    'footer.docs': 'Documentation',
    'footer.tutorials': 'Tutorials',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.socials': 'Follow us',
    'footer.newsletter': 'Stay updated',
    'footer.copyright': '2025 Buen Día Builders. Building Web3\'s future in LATAM.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  defaultLanguage = 'es',
}: {
  children: React.ReactNode;
  defaultLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('bdb-language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('bdb-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}