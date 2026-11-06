import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'text';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  withArrow?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  magnetic = false,
  withArrow = false,
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !btnRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-[11px] tracking-[0.2em]',
    md: 'px-7 py-3.5 text-xs tracking-[0.25em]',
    lg: 'px-9 py-4 text-xs tracking-[0.28em]',
  };

  if (variant === 'text') {
    return (
      <button
        ref={btnRef}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`group relative inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-ivory hover:text-gold transition-colors duration-300 py-1 ${className}`}
      >
        <span>{children}</span>
        {withArrow && (
          <ArrowUpRight
            size={14}
            className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-gold"
          />
        )}
        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
      </button>
    );
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-black text-ivory border border-sand/30 hover:border-gold';
      case 'outline':
        return 'bg-transparent text-ivory border border-sand/40 hover:border-gold';
      case 'gold':
        return 'bg-gold text-black border border-gold hover:bg-gold-light';
      case 'secondary':
        return 'bg-beige text-black border border-sand hover:bg-white';
      default:
        return 'bg-black text-ivory';
    }
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.1 }}
      onClick={onClick}
      className={`group relative overflow-hidden uppercase font-sans font-medium transition-all duration-500 inline-flex items-center justify-center gap-3 select-none active:scale-[0.98] ${getVariantClasses()} ${sizeClasses[size]} ${className}`}
    >
      {(variant === 'primary' || variant === 'outline') && (
        <span className="absolute inset-0 w-full h-full bg-gold -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0" />
      )}

      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-400 ${
          variant === 'primary' || variant === 'outline'
            ? 'group-hover:text-black'
            : ''
        }`}
      >
        <span>{children}</span>
        {withArrow && (
          <ArrowUpRight
            size={15}
            strokeWidth={1.25}
            className="transform transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        )}
      </span>
    </motion.button>
  );
};
