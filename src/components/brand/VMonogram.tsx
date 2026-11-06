import React from 'react';

interface VMonogramProps {
  className?: string;
  size?: number | string;
  strokeOnly?: boolean;
  animate?: boolean;
  watermark?: boolean;
}

export const VMonogram: React.FC<VMonogramProps> = ({
  className = '',
  size = 48,
  strokeOnly = false,
  watermark = false,
}) => {
  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      className={`inline-block transition-transform duration-700 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vanterGoldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3DC9B" />
          <stop offset="35%" stopColor="#C9A45C" />
          <stop offset="70%" stopColor="#DFC386" />
          <stop offset="100%" stopColor="#8A6724" />
        </linearGradient>
        <linearGradient id="vanterGoldSheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFF2D6" stopOpacity="1" />
          <stop offset="100%" stopColor="#C9A45C" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {watermark ? (
        <g stroke="currentColor" strokeWidth="1.2" opacity="0.12" fill="none">
          <polygon points="45,60 95,60 150,225 150,245 138,245 45,60" />
          <polygon points="255,60 205,60 150,225 150,245 162,245 255,60" />
          <polygon points="112,60 188,60 150,140" />
          <polygon points="150,152 142,215 150,235 158,215" />
        </g>
      ) : strokeOnly ? (
        <g stroke="url(#vanterGoldMetallic)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Outer left wing */}
          <path d="M 45 60 L 95 60 L 150 240 L 138 240 Z" />
          {/* Outer right wing */}
          <path d="M 255 60 L 205 60 L 150 240 L 162 240 Z" />
          {/* Top inverted triangle */}
          <path d="M 112 60 L 188 60 L 150 140 Z" />
          {/* Center inner stem */}
          <path d="M 150 152 L 142 215 L 150 235 L 158 215 Z" />
        </g>
      ) : (
        <g fill="url(#vanterGoldMetallic)">
          {/* Left Wing */}
          <polygon points="45,60 95,60 150,225 150,245 138,245 45,60" />
          {/* Right Wing */}
          <polygon points="255,60 205,60 150,225 150,245 162,245 255,60" />
          {/* Central Inverted Triangle */}
          <polygon points="112,60 188,60 150,140" />
          {/* Central Stem */}
          <polygon points="150,152 142,215 150,235 158,215" />
        </g>
      )}
    </svg>
  );
};

