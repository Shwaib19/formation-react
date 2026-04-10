import React from 'react';

/**
 * Composant Select réutilisable pour tous les menus déroulants.
 * 
 * Pourquoi ce composant ?
 * 1. Factorise le label, le menu et le message d'erreur.
 * 2. Unifie le style visuel (border, focus, rings).
 * 3. Gère l'option par défaut (vide).
 */

const Select = ({ 
  label,              // Titre au-dessus du menu
  name,               // Nom de l'attribut HTML
  value,              // Valeur contrôlée
  onChange,           // Handler de changement
  options = [],       // Array<{ value, label }>
  placeholder = "",   // Option vide initiale
  error = "",         // Message d'erreur
  required = false,   // Champ obligatoire
  className = ""      // Classes additionnelles
}) => {
  
  const selectId = `select-${name}`;

  const selectClasses = `
    block w-full px-4 py-2 text-sm text-text-main border rounded-lg transition-colors focus:outline-none focus:ring-2 bg-white
    ${error 
      ? 'border-red-500 focus:ring-red-500' 
      : 'border-tertiary focus:ring-primary'}
    ${className}
  `.trim();

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={selectId} 
          className="block mb-1 text-xs font-semibold text-text-muted uppercase tracking-wider"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={selectClasses}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
