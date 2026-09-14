import React from 'react';

/**
 * ShineButton (Inspired by Skiper UI)
 * Features a periodic light-beam sweep and interactive scale hover.
 */
const ShineButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const baseStyles = "shine-button inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

  let variantStyles = "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md hover:shadow-blue-500/25";
  if (variant === 'gold') {
    variantStyles = "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-extrabold shadow-md hover:shadow-amber-500/30";
  } else if (variant === 'dark') {
    variantStyles = "bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 shadow-xs";
  } else if (variant === 'emerald') {
    variantStyles = "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md hover:shadow-emerald-500/25";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ShineButton;
