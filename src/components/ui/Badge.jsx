import React from 'react';

/**
 * Composant Badge pour afficher des étiquettes sémantiques.
 * 
 * Pourquoi ce composant ?
 * 1. Uniformise l'affichage des statuts (Disponible, Indisponible, etc.).
 * 2. Gère les couleurs sémantiques (Success, Error, Info, Warning).
 */

const Badge = ({ 
  label,              // Texte affiché
  variant = 'info',   // 'success' | 'error' | 'info' | 'warning'
  className = ""      // Classes additionnelles
}) => {
  
  // Style de base pour un badge moderne (pilule)
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border";
  
  // Mapping pour les variantes
  const variants = {
    // Statut positif (ex: Disponible)
    success: "bg-green-100 text-green-800 border-green-200",
    
    // Statut négatif (ex: Supprimé, Erreur)
    error:   "bg-red-100 text-red-800 border-red-200",
    
    // Information neutre (ex: Catégorie, Tag)
    info:    "bg-tertiary/10 text-primary border-tertiary/20",
    
    // Avertissement (ex: En cours)
    warning: "bg-orange-100 text-orange-800 border-orange-200"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`.trim();

  return (
    <span className={combinedClasses}>
      {label}
    </span>
  );
};

export default Badge;
