'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

const colors = [
  'bg-blue-500/20',
  'bg-purple-500/20',
  'bg-teal-500/20',
  'bg-orange-500/20',
  'bg-pink-500/20',
  'bg-green-500/20',
  'bg-yellow-500/20',
  'bg-red-500/20',
];

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      
      for (let i = 0; i < 12; i++) {
        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 10,
        });
      }
      
      setElements(newElements);
    };

    generateElements();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <div
          key={element.id}
          className={cn(
            'absolute rounded-full blur-sm animate-float',
            element.color
          )}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
            animationDelay: `${element.delay}s`,
            animationDuration: '20s',
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(90deg); }
          50% { transform: translate(-15px, 30px) rotate(180deg); }
          75% { transform: translate(30px, 10px) rotate(270deg); }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}