import React from 'react';

interface VanterFlaconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'noir' | 'ambre' | 'santal' | 'rose';
}

export const VanterFlacon: React.FC<VanterFlaconProps> = ({
  className = '',
  size = 'lg',
  variant = 'noir',
}) => {
  const sizeMap = {
    sm: 'w-40 h-56',
    md: 'w-56 h-72',
    lg: 'w-72 h-96 sm:w-80 sm:h-[420px] md:w-96 md:h-[480px]',
    xl: 'w-80 h-[440px] sm:w-96 sm:h-[520px] md:w-[420px] md:h-[560px]',
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      {/* Ambient Backlight Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold/25 via-gold/10 to-transparent rounded-full blur-3xl opacity-70 pointer-events-none transform scale-90" />

      {/* SVG Flacon */}
      <svg
        viewBox="0 0 400 560"
        className="w-full h-full filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.9)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Cap Metallic Gradient */}
          <linearGradient id="goldCapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A6724" />
            <stop offset="25%" stopColor="#DFBF7A" />
            <stop offset="50%" stopColor="#FFF2D4" />
            <stop offset="75%" stopColor="#C9A45C" />
            <stop offset="100%" stopColor="#735218" />
          </linearGradient>

          {/* Gold Collar Gradient */}
          <linearGradient id="goldCollarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#735218" />
            <stop offset="30%" stopColor="#E5C884" />
            <stop offset="70%" stopColor="#FAF0D7" />
            <stop offset="100%" stopColor="#8A6724" />
          </linearGradient>

          {/* Flacon Glass Body Gradient (Deep Obsidian / Smoked Crystal) */}
          <linearGradient id="glassBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B0B0C" stopOpacity="0.98" />
            <stop offset="15%" stopColor="#1C1A1E" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#252128" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#1C1A1E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0B0B0C" stopOpacity="0.98" />
          </linearGradient>

          {/* Liquid Amber/Oud Core Refraction */}
          <radialGradient id="liquidRefraction" cx="50%" cy="65%" r="45%">
            <stop offset="0%" stopColor="#85531B" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#301E0D" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Glass Side Highlights */}
          <linearGradient id="specularHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Label Gradient */}
          <linearGradient id="labelBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#121214" />
            <stop offset="100%" stopColor="#09090A" />
          </linearGradient>
        </defs>

        {/* 1. FLACON CAP (Magnetic Heavy Gold Cylinder) */}
        <g id="cap">
          {/* Top Ellipse / Dome of Cap */}
          <ellipse cx="200" cy="52" rx="46" ry="12" fill="url(#goldCapGrad)" />
          {/* Cap Body Cylinder */}
          <rect x="154" y="52" width="92" height="72" fill="url(#goldCapGrad)" rx="2" />
          {/* Cap Base Ring */}
          <ellipse cx="200" cy="124" rx="46" ry="10" fill="#735218" />
          {/* Top Highlight Rim */}
          <ellipse cx="200" cy="51" rx="43" ry="10" fill="none" stroke="#FFF7E6" strokeWidth="1" opacity="0.6" />
          {/* Subtle Knurled / Beveled Ridge on Cap */}
          <line x1="154" y1="112" x2="246" y2="112" stroke="#5E4314" strokeWidth="1.5" />
          <line x1="154" y1="114" x2="246" y2="114" stroke="#FFE9BE" strokeWidth="1" opacity="0.7" />
        </g>

        {/* 2. SPRAY NOZZLE / GOLD COLLAR RING */}
        <g id="collar">
          <rect x="180" y="124" width="40" height="18" fill="url(#goldCollarGrad)" />
          <ellipse cx="200" cy="142" rx="20" ry="4" fill="#664913" />
        </g>

        {/* 3. FLACON GLASS SHOULDER & BODY */}
        <g id="glass-bottle">
          {/* Main Heavy Crystal Body with Soft Curved Shoulders */}
          <path
            d="
              M 174 142
              Q 200 144 226 142
              Q 260 148 290 174
              Q 302 186 302 208
              L 302 480
              Q 302 506 280 506
              L 120 506
              Q 98 506 98 480
              L 98 208
              Q 98 186 110 174
              Q 140 148 174 142
              Z
            "
            fill="url(#glassBodyGrad)"
            stroke="#C9A45C"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />

          {/* Liquid Refraction inside Flacon */}
          <rect x="108" y="200" width="184" height="280" fill="url(#liquidRefraction)" rx="10" />

          {/* Thick Solid Crystal Base Bottom Glass */}
          <path
            d="
              M 102 472
              L 298 472
              L 298 484
              Q 298 504 278 504
              L 122 504
              Q 102 504 102 484
              Z
            "
            fill="#121013"
            stroke="url(#goldCapGrad)"
            strokeWidth="0.75"
            strokeOpacity="0.4"
          />
          {/* Base Glass Internal Reflection Bar */}
          <line x1="126" y1="488" x2="274" y2="488" stroke="#E3C88A" strokeWidth="1" opacity="0.3" />

          {/* Left Specular Glint (Long sleek vertical highlight) */}
          <path
            d="
              M 104 204
              L 114 204
              L 114 470
              L 104 470
              Z
            "
            fill="url(#specularHighlight)"
            opacity="0.35"
          />
          <path
            d="
              M 112 176
              Q 104 186 104 204
              L 107 204
              Q 107 188 116 178
              Z
            "
            fill="#FFFFFF"
            opacity="0.4"
          />

          {/* Right Subtle Reflection */}
          <path
            d="
              M 292 204
              L 296 204
              L 296 470
              L 292 470
              Z
            "
            fill="#FFFFFF"
            opacity="0.2"
          />
        </g>

        {/* 4. LUXURY CENTER EMBOSSED LABEL PLAQUE */}
        <g id="label" transform="translate(136, 230)">
          {/* Label Card Base */}
          <rect
            x="0"
            y="0"
            width="128"
            height="180"
            rx="3"
            fill="url(#labelBgGrad)"
            stroke="#C9A45C"
            strokeWidth="1.2"
          />

          {/* Inner Thin Gold Foil Border */}
          <rect
            x="4"
            y="4"
            width="120"
            height="172"
            rx="2"
            fill="none"
            stroke="#C9A45C"
            strokeWidth="0.7"
            strokeDasharray="160 2"
            opacity="0.85"
          />

          {/* Gold Monogram Icon on Label */}
          <g transform="translate(48, 18) scale(0.11)" fill="url(#goldCapGrad)">
            <polygon points="45,60 95,60 150,225 150,245 138,245 45,60" />
            <polygon points="255,60 205,60 150,225 150,245 162,245 255,60" />
            <polygon points="112,60 188,60 150,140" />
            <polygon points="150,152 142,215 150,235 158,215" />
          </g>

          {/* Brand Name */}
          <text
            x="64"
            y="68"
            fontFamily="'Cinzel', 'Cormorant Garamond', serif"
            fontSize="15"
            fill="#FAF8F3"
            textAnchor="middle"
            letterSpacing="5"
          >
            VANTÉR
          </text>

          {/* Divider rule */}
          <line x1="34" y1="78" x2="94" y2="78" stroke="#C9A45C" strokeWidth="0.75" opacity="0.7" />

          {/* Fragrance Name */}
          <text
            x="64"
            y="98"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="13"
            fontWeight="600"
            fill="#E3C88A"
            textAnchor="middle"
            letterSpacing="2.5"
          >
            NOIR ABSOLU
          </text>

          {/* Concentration */}
          <text
            x="64"
            y="114"
            fontFamily="'Jost', system-ui, sans-serif"
            fontSize="7"
            fill="#8C7F6E"
            textAnchor="middle"
            letterSpacing="1.8"
          >
            EXTRAIT DE PARFUM
          </text>

          {/* City / Heritage */}
          <text
            x="64"
            y="142"
            fontFamily="'Jost', system-ui, sans-serif"
            fontSize="6.5"
            fill="#FAF8F3"
            opacity="0.75"
            textAnchor="middle"
            letterSpacing="2.5"
          >
            PARIS • GRASSE
          </text>

          {/* Volume */}
          <text
            x="64"
            y="158"
            fontFamily="'Jost', system-ui, sans-serif"
            fontSize="6"
            fill="#8C7F6E"
            textAnchor="middle"
            letterSpacing="2"
          >
            100 ML — 3.4 FL.OZ.
          </text>
        </g>

        {/* 5. REFLECTIVE FLOOR SHADOW */}
        <ellipse cx="200" cy="528" rx="100" ry="12" fill="#000000" opacity="0.8" />
        <ellipse cx="200" cy="526" rx="60" ry="6" fill="#C9A45C" opacity="0.12" />
      </svg>
    </div>
  );
};

