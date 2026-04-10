import React from 'react';

/**
 * Composant Input réutilisable pour tous les formulaires.
 * 
 * Pourquoi ce composant ?
 * 1. Factorise le label, le champ et le message d'erreur.
 * 2. Unifie le style visuel (border, focus, rings).
 * 3. Facilite l'accessibilité (id unique, label associé).
 */

const Input = ({ 
  label,              // Titre au-dessus du champ
  name,               // Nom de l'attribut HTML
  value,              // Valeur contrôlée
  onChange,           // Handler de changement
  type = 'text',      // 'text' | 'date' | 'email' | 'password' ...
  placeholder = "",   // Texte indicatif
  error = "",         // Message d'erreur
  required = false,   // Champ obligatoire
  className = ""      // Classes additionnelles
}) => {
  
  // Identifiant unique pour le lien label-input
  const inputId = `input-${name}`;

  // On compose les classes de l'input dynamique (selon l'état d'erreur)
  const inputClasses = `
    block w-full px-4 py-2 text-sm text-text-main border rounded-lg transition-colors focus:outline-none focus:ring-2
    ${error 
      ? 'border-red-500 focus:ring-red-500' 
      : 'border-tertiary focus:ring-primary'}
    ${className}
  `.trim();

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block mb-1 text-xs font-semibold text-text-muted uppercase tracking-wider"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
      />
      
      {/* Affichage du message d'erreur s'il existe */}
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
