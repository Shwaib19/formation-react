import React from 'react';

/**
 * Composant Button réutilisable.
 * 
 * Pourquoi ce composant ?
 * 1. Centralise le design (Tailwind) pour tous les boutons.
 * 2. Facilite la gestion des variantes (Primary, Secondary, etc.).
 * 3. Assure une accessibilité de base.
 */

const Button = ({ 
  children,           // Contenu (texte, icônes)
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger'
  size = 'md',        // 'sm' | 'md' | 'lg'
  type = 'button',    // 'button' | 'submit'
  disabled = false,   // État désactivé
  onClick,            // Handler de clic
  fullWidth = false,   // Largeur 100%
  className = ""      // Classes additionnelles si besoin
}) => {
  
  // On définit les styles de base communs à tous les boutons
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Mapping pour les tailles (paddings et texte)
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  // Mapping pour les variantes de couleurs
  const variants = {
    primary:   "bg-primary text-white hover:bg-opacity-90 focus:ring-primary",
    secondary: "bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary",
    outline:   "border border-primary text-primary hover:bg-primary/10",
    danger:    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
  };

  // On compose les classes finales dynamiquement
  const combinedClasses = `
    ${baseStyles} 
    ${sizes[size]} 
    ${variants[variant]} 
    ${fullWidth ? 'w-full' : ''} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim();

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default Button;
