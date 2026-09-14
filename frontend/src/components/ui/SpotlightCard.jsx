import React, { useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * SpotlightCard (Inspired by Vengence & Aceternity UI)
 * Dynamic cursor-following spotlight glow with glassmorphic backdrop.
 * Adapts glow color automatically to light vs dark theme.
 */
const SpotlightCard = ({ 
  children, 
  className = '', 
  spotlightColor,
  ...props 
}) => {
  const { isDark } = useTheme();
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const defaultSpotlight = isDark 
    ? 'rgba(96, 165, 250, 0.22)' 
    : 'rgba(37, 99, 235, 0.12)';

  const activeColor = spotlightColor || defaultSpotlight;

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${activeColor}, transparent 75%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
