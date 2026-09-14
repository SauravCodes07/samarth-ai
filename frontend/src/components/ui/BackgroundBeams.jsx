import React from 'react';

/**
 * BackgroundBeams (Inspired by Vengence UI)
 * Floating ambient glow orbs with hardware-accelerated transforms (0 CPU lag).
 */
const BackgroundBeams = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}>
      {/* Orb 1: Subtle Blue glow */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl animate-float-mesh-1"
        style={{ willChange: 'transform' }}
      />
      {/* Orb 2: Subtle Amber glow */}
      <div 
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl animate-float-mesh-2"
        style={{ willChange: 'transform' }}
      />
      {/* Orb 3: Indigo base glow */}
      <div 
        className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl animate-float-mesh-1"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default BackgroundBeams;
