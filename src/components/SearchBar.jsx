import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Barre de recherche universelle avec icônes et bouton 'Clear'.
 * 
 * Pourquoi ce composant ?
 * 1. Interface utilisateur fluide (Feedback visuel lors de la frappe).
 * 2. Améliore l'expérience utilisateur avec le bouton 'X' pour effacer.
 * 3. Indépendante de la donnée recherchée (Réutilisable partout).
 */

const SearchBar = ({ 
  value,              // Valeur actuelle (State contrôlé)
  onChange,           // Callback pour mettre à jour la valeur
  placeholder = "Rechercher...", // Texte par défaut
  className = ""      // Classes personnalisées
}) => {
  return (
    <div className={`relative w-full max-w-lg ${className}`}>
      
      {/* Icône Loupe (Lucide) - Positionnée à gauche */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search size={18} className="text-text-muted opacity-50 transition-colors group-focus-within:text-primary" />
      </div>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full p-2.5 pl-10 pr-10 text-sm text-text-main border border-tertiary/40 rounded-xl bg-surface focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none shadow-sm"
        placeholder={placeholder}
      />

      {/* Bouton pour Effacer la recherche - N'apparait que si 'value' n'est pas vide */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-3 group hover:text-red-500 transition-colors"
          title="Effacer la recherche"
        >
          <X size={18} className="text-text-muted group-hover:text-red-500" />
        </button>
      )}

    </div>
  );
};

export default SearchBar;
