import React from 'react';
import Button from './Button';

/**
 * Composant Modal de confirmation.
 * 
 * Pourquoi ce composant ?
 * 1. Pour les actions irréversibles (ex: Suppression).
 * 2. Bloque l'interface pour forcer un choix.
 * 3. Assure une accessibilité visuelle (overlay sombre).
 */

const Modal = ({ 
  isOpen,             // Booléen : afficher ou pas ?
  title,              // Titre de la modale
  message,            // Corps du message
  onConfirm,          // Action de confirmation
  onCancel,            // Fermeture sans action
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "danger"   // Variante du bouton de confirmation
}) => {
  
  // Si la modale n'est pas ouverte, on ne rend rien (early return)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header de la modale */}
        <div className="p-6 pb-0">
          <h3 className="text-xl font-bold text-primary">
            {title}
          </h3>
        </div>

        {/* Corps de la modale */}
        <div className="p-6">
          <p className="text-sm text-text-muted leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer (actions) */}
        <div className="p-6 pt-0 flex gap-3 justify-end bg-gray-50/50">
          <Button 
            variant="outline" 
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          
          <Button 
            variant={variant} 
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
