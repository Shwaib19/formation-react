import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit2, Trash2, ChevronRight, User } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';

/**
 * Carte interactive pour afficher un Auteur.
 * 
 * Pourquoi ce composant ?
 * 1. Présentation claire d'un auteur.
 * 2. Visualisation du nombre de livres associés (Badge).
 * 3. Tronque la biographie pour éviter des cartes trop longues.
 * 4. Gestion optionnelle des actions de modification/suppression.
 */

const AuteurCard = ({ 
  item,                // Objet auteur: { id, nom, biographie, nbLivres }
  showActions = false, // Afficher ou non les actions
  onDelete             // Handler pour la suppression
}) => {
  const navigate = useNavigate();

  const { id, nom, biographie, nbLivres } = item;

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">
      
      {/* Badge du nombre de livres (En haut à droite) */}
      <div className="absolute top-4 right-4">
        <Badge 
          label={`${nbLivres} livres`} 
          variant="info" 
        />
      </div>

      {/* Contenu principal */}
      <div className="mb-6 flex items-start gap-4">
        <div className="p-3 bg-tertiary/10 rounded-full text-primary group-hover:bg-tertiary/30 transition-colors">
          <User size={24} />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-primary truncate pr-16 group-hover:text-secondary transition-colors">
            {nom}
          </h3>
          <p className="text-sm text-text-muted mt-2 line-clamp-2 leading-relaxed">
            {biographie || "Aucune biographie disponible."}
          </p>
        </div>
      </div>

      {/* Footer : Actions ou Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        
        {showActions ? (
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 gap-2"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/modifier-auteur/${id}`);
              }}
            >
              <Edit2 size={14} /> Modifier
            </Button>
            <Button 
              variant="danger" 
              size="sm" 
              onClick={(e) => {
                e.preventDefault();
                onDelete(id);
              }}
              // Optionnel : Désactiver le bouton si l'auteur a des livres pour préserver l'intégrité
              disabled={nbLivres > 0}
              title={nbLivres > 0 ? "Impossible de supprimer un auteur ayant des livres" : ""}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ) : (
          <Link 
            to={`/auteurs/${id}`} 
            className="text-sm font-semibold text-secondary flex items-center gap-1 hover:gap-2 transition-all ml-auto"
          >
            Découvrir ses livres <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Overlay cliquable */}
      {!showActions && (
        <Link 
          to={`/auteurs/${id}`} 
          className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50" 
          aria-label={`Voir le détail de ${nom}`}
        />
      )}
    </div>
  );
};

export default AuteurCard;
