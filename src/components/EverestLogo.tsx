import React from 'react';
import { motion } from 'motion/react';

interface EverestLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light-bg' | 'dark-bg';
  onClick?: () => void;
}

export const EverestLogo: React.FC<EverestLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light-bg',
  onClick
}) => {
  const isDarkBg = variant === 'dark-bg';

  // Sizing configurations
  const dimensions = {
    sm: { symbol: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { symbol: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { symbol: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' }
  }[size];

  return (
    <motion.div 
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-label="The Everest IT - Logo"
    >
      {/* 
        Custom Unique 'E' Symbol:
        - Top horizontal bar: Black (#1D1E2C) or White on dark backgrounds
        - Rest of the 'E' (vertical spine, middle bar, bottom bar): Crimson Red (#D90429)
      */}
      <div className={`relative ${dimensions.symbol} shrink-0`}>
        <motion.svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
          initial={{ opacity: 0.9 }}
          whileHover={{ rotate: [-1, 1, 0] }}
          transition={{ duration: 0.3 }}
        >
          {/* Subtle geometric backing rounded contour */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="18"
            fill={isDarkBg ? '#1D1E2C' : '#FFFFFF'}
            stroke={isDarkBg ? '#2D2E3E' : '#F1F5F9'}
            strokeWidth="3"
          />

          {/* 
            UPPER HORIZONTAL BAR OF 'E': 
            STRICTLY in BLACK COLOR (#1D1E2C) (or Crisp White on dark footer)
          */}
          <motion.path
            d="M 28 24 L 78 24 C 81.3 24 84 26.7 84 30 L 84 35 C 84 37 82.5 38 80.5 38 L 44 38 L 44 24 Z"
            fill={isDarkBg ? '#FFFFFF' : '#1D1E2C'}
            whileHover={{ x: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          />

          {/* 
            REST OF THE 'E' (Vertical Backbone, Middle Bar, Bottom Bar):
            STRICTLY in CRIMSON RED (#D90429) with mountain peak geometric styling
          */}
          {/* Vertical Stem */}
          <path
            d="M 28 24 L 44 24 L 44 76 L 28 76 C 25.8 76 24 74.2 24 72 L 24 28 C 24 25.8 25.8 24 28 24 Z"
            fill="#D90429"
          />

          {/* Middle Bar */}
          <path
            d="M 44 47 L 70 47 C 72 47 73.5 48.5 73.5 50.5 L 73.5 54.5 C 73.5 56.5 72 58 70 58 L 44 58 Z"
            fill="#D90429"
          />

          {/* Bottom Bar with subtle Everest peak slope */}
          <path
            d="M 44 67 L 80 67 C 82 67 83.5 68.5 83.5 70.5 L 83.5 74 C 83.5 76 81.5 77.5 79 77.5 L 30 77.5 C 27 77.5 24 75 24 72 L 44 67 Z"
            fill="#D90429"
          />

          {/* Everest stylized subtle summit cut accent in Red */}
          <polygon
            points="62,47 69,38 76,47"
            fill="#D90429"
            opacity="0.85"
          />
        </motion.svg>
      </div>

      {/* Bold mixed Black & Red typography: "The EVEREST IT" */}
      <div className="flex flex-col justify-center leading-tight">
        <div className={`font-extrabold tracking-tight whitespace-nowrap ${dimensions.text}`}>
          <span className={isDarkBg ? 'text-white' : 'text-[#1D1E2C]'}>The </span>
          <span className="text-[#D90429]">EVEREST </span>
          <span className={isDarkBg ? 'text-white' : 'text-[#1D1E2C]'}>IT</span>
        </div>
        <span className={`tracking-widest font-semibold uppercase text-slate-400 ${dimensions.sub} -mt-0.5`}>
          Hands-on IT Institute
        </span>
      </div>
    </motion.div>
  );
};
