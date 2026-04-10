import React from 'react';

/**
 * Composant PageWrapper pour uniformiser le layout.
 * 
 * Pourquoi ce composant ?
 * 1. Garantit une largeur maximale (max-w-6xl) sur tous les écrans.
 * 2. Ajoute un padding cohérent (px-4, py-8).
 * 3. Permet d'injecter un titre de page de manière structurée.
 */

const PageWrapper = ({ 
  children,           // Le contenu de la page
  title,              // Titre optionnel à afficher en haut
  fullWidth = false   // Pour les pages spéciales (ex: Accueil)
}) => {
  return (
    <div className={`
      ${fullWidth ? 'w-full' : 'max-w-7xl mx-auto px-4 py-8'} 
      min-h-[calc(100vh-160px)]
    `}>
      {/* Si un titre est fourni, on l'affiche avec le style H1 défini */}
      {!fullWidth && title && (
        <h1 className="text-3xl font-bold text-primary mb-8 border-b border-tertiary/20 pb-4">
          {title}
        </h1>
      )}
      
      {/* Le contenu proprement dit */}
      {children}
    </div>
  );
};

export default PageWrapper;
