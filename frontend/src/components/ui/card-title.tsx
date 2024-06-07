import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { parseISO } from 'date-fns';

// Função para interpolar entre duas cores
const interpolateColor = (color1: string, color2: string, factor: number): string => {
  if (!color1 || !color2) return '#000000'; // Retorna preto se as cores não forem válidas

  const match1 = color1.slice(1).match(/.{2}/g);
  const match2 = color2.slice(1).match(/.{2}/g);

  if (!match1 || !match2) return '#000000'; // Retorna preto se a correspondência de regex falhar

  const result = match1.map((hex, i) => {
    const hex2 = match2[i];
    return Math.round(parseInt(hex, 16) + factor * (parseInt(hex2, 16) - parseInt(hex, 16)))
      .toString(16)
      .padStart(2, '0');
  });
  
  return `#${result.join('')}`;
};

// Função para calcular o degradê baseado no tempo entre três cores
const getGradientBasedOnTime = (minutes: number): string => {
  const cor1 = '#00A76D'; // Cor inicial
  const cor2 = '#FBBC04'; // Cor intermediária
  const cor3 = '#EA4335'; // Cor final

  let factor = Math.min(minutes / 15, 1);

  if (factor <= 0.5) {
    return interpolateColor(cor1, cor2, factor * 2); // Interpola entre cor1 e cor2
  } else {
    return interpolateColor(cor2, cor3, (factor - 0.5) * 2); // Interpola entre cor2 e cor3
  }
};

// Componente Card Title
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement> & { createdAt: string }>(
  ({ className, createdAt, ...props }, ref) => {
    const [background, setBackground] = useState(getGradientBasedOnTime(0));

    useEffect(() => {
      const updateBackground = () => {
        const elapsedTime = Math.floor((new Date().getTime() - parseISO(createdAt).getTime()) / (60 * 1000));
        setBackground(getGradientBasedOnTime(elapsedTime));
      };

      updateBackground();
      const interval = setInterval(updateBackground, 300); // Atualiza a cada 300 ms

      return () => clearInterval(interval);
    }, [createdAt]);

    return (
      <h3
        ref={ref}
        className={cn(
          `text-center text-white rounded-md shadow-md font-bold text-2xl p-2`,
          className
        )}
        style={{ background }}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

export { CardTitle };
