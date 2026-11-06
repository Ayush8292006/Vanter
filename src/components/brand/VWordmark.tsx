import React from 'react';

interface VWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant';
  color?: 'gold' | 'ivory' | 'black';
  showSubtitle?: boolean;
  subtitleText?: string;
}

export const VWordmark: React.FC<VWordmarkProps> = ({
  className = '',
  size = 'md',
  color = 'gold',
  showSubtitle = false,
  subtitleText = 'MAISON DE PARFUM',
}) => {
  const sizeClasses = {
    sm: 'text-base tracking-[0.35em]',
    md: 'text-xl sm:text-2xl tracking-[0.4em]',
    lg: 'text-3xl sm:text-4xl tracking-[0.45em]',
    xl: 'text-4xl sm:text-6xl tracking-[0.5em]',
    giant: 'text-5xl sm:text-7xl md:text-9xl tracking-[0.45em]',
  };

  const colorClasses = {
    gold: 'text-gold',
    ivory: 'text-ivory',
    black: 'text-black',
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center text-center select-none ${className}`}>
      <span
        className={`font-cinzel font-normal uppercase transition-colors duration-300 ${sizeClasses[size]} ${colorClasses[color]}`}
        style={{ letterSpacing: '0.38em', textIndent: '0.38em' }}
      >
        VANTÉR
      </span>
      {showSubtitle && (
        <span
          className="text-[9px] sm:text-[10px] tracking-[0.45em] text-taupe uppercase font-sans mt-1.5"
          style={{ letterSpacing: '0.45em', textIndent: '0.45em' }}
        >
          {subtitleText}
        </span>
      )}
    </div>
  );
};

