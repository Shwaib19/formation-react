import React from 'react';
import { SearchX } from 'lucide-react';

/**
 * Composant EmptyState pour les listes vides ou erreurs 404.
 * 
 * Pourquoi ce composant ?
 * 1. Évite un écran blanc frustrant pour l'utilisateur.
 * 2. Propose toujours une action de repli (ex: Revenir en arrière).
 * 3. Utilise des icônes descriptives (Lucide).
 */

const EmptyState = ({ 
  message = "Aucun élément trouvé", 
  subMessage = "Essayez de modifier vos critères de recherche.", 
  action,             // Un bouton ou un lien d'action
  icon: Icon = SearchX // L'icône par défaut
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface rounded-2xl border-2 border-dashed border-gray-200">
      
      {/* Icône illustrative */}
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <Icon size={48} className="text-text-muted opacity-40" />
      </div>

      {/* Textes descriptifs */}
      <h3 className="text-xl font-bold text-primary mb-2">
        {message}
      </h3>
      
      {subMessage && (
        <p className="text-sm text-text-muted max-w-sm mb-6">
          {subMessage}
        </p>
      )}

      {/* Zone d'action interactive */}
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
      
    </div>
  );
};

export default EmptyState;
