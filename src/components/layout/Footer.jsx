import React from 'react';

/**
 * Composant Footer simple et centré.
 * 
 * Pourquoi ce composant ?
 * 1. Clôture visuellement la page.
 * 2. Structure constante sur toutes les vues.
 */

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 mt-auto border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* Logo / Nom de l'app */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl">📚</span>
          <span className="text-xl font-bold tracking-tight">Biblio</span>
        </div>

        {/* Textes du footer */}
        <p className="text-sm text-white/60 mb-2">
          Projet réalisé dans le cadre de la formation Django & React
        </p>
        
        <p className="text-xs text-white/40 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} · Tous droits réservés
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;
