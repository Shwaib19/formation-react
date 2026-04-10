import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpen, Users, PlusCircle, Menu, X, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';

/**
 * Composant NavBar avec menu Dropdown et navigation responsive.
 * 
 * Pourquoi ce composant ?
 * 1. Barre de navigation fixe (Sticky).
 * 2. Utilisation de 'NavLink' pour la détection du lien 'actif'.
 * 3. Gestion d'un état local 'isOpen' pour le menu mobile.
 * 4. Dropdown pour les actions rapides d'ajout.
 */

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Style partagé pour les liens de navigation (Desktop et Mobile)
  const navLinkStyles = ({ isActive }) => `
    flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${isActive ? 'bg-tertiary/20 text-tertiary border-b-2 border-tertiary rounded-none' : 'text-white/80 hover:text-white hover:bg-white/10'}
  `;

  return (
    <nav className="sticky top-0 z-50 bg-primary text-white shadow-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo et Nom de l'app */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold tracking-tight">Biblio</span>
          </Link>

          {/* Navigation Desktop (Milieu) */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/livres" className={navLinkStyles}>
              <BookOpen size={18} /> Livres
            </NavLink>
            <NavLink to="/auteurs" className={navLinkStyles}>
              <Users size={18} /> Auteurs
            </NavLink>
          </div>

          {/* Bouton "+ Ajouter" (Desktop) avec Dropdown */}
          <div className="hidden md:block relative">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Ajouter
              <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>

            {/* Menu Dropdown - Apparait si ouvert */}
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white text-text-main rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link 
                  to="/ajouter-livre" 
                  className="block px-4 py-2 text-sm hover:bg-surface hover:text-primary transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Ajouter un livre
                </Link>
                <Link 
                  to="/ajouter-auteur" 
                  className="block px-4 py-2 text-sm hover:bg-surface hover:text-primary transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Ajouter un auteur
                </Link>
              </div>
            )}
          </div>

          {/* Bouton Menu Burger (Mobile) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white/80 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile - Apparait si ouvert */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in slide-in-from-top-4">
            <NavLink 
              to="/livres" 
              className={navLinkStyles} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen size={18} /> Livres
            </NavLink>
            <NavLink 
              to="/auteurs" 
              className={navLinkStyles} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users size={18} /> Auteurs
            </NavLink>
            <div className="pt-2 border-t border-white/10 space-y-1">
              <Link to="/ajouter-livre" className="block px-3 py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                + Ajouter un livre
              </Link>
              <Link to="/ajouter-auteur" className="block px-3 py-2 text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                + Ajouter un auteur
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
