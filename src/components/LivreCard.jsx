import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit2, Trash2, ChevronRight, Calendar, User } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';

/**
 * Carte interactive pour afficher un Livre.
 * 
 * Pourquoi ce composant ?
 * 1. Interface visuelle condensée d'une ressource (Card).
 * 2. Navigation vers le détail simplifiée.
 * 3. Gestion optionnelle des actions de modification/suppression.
 * 4. Animations au survol (Hover).
 */

const LivreCard = ({ 
  item,                // Objet livre : { id, titre, auteurNom, date_publication, disponible }
  showActions = false, // Afficher ou non les boutons Modif/Suppr
  onDelete             // Handler pour la suppression
}) => {
  const navigate = useNavigate();

  // On extrait les propriétés de l'item par destructuration
  const { id, titre, auteurNom, date_publication, disponible } = item;

  // On formate la date pour l'affichage (ex: 2024 au lieu de 2024-03-29)
  const displayYear = date_publication ? new Date(date_publication).getFullYear() : 'N/A';

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Badge Disponibilité (En haut à droite) */}
      <div className="absolute top-4 right-4">
        <Badge 
          label={disponible ? "Disponible" : "Indisponible"} 
          variant={disponible ? "success" : "error"} 
        />
      </div>

      {/* Contenu principal */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-primary mb-2 line-clamp-1 pr-16 group-hover:text-secondary transition-colors">
          {titre}
        </h3>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <User size={14} className="text-tertiary" />
            <span>{auteurNom || "Auteur inconnu"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Calendar size={14} className="text-tertiary" />
            <span>Publié en {displayYear}</span>
          </div>
        </div>
      </div>

      {/* Pied de la carte : Boutons d'action ou de navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        
        {/* Si showActions est vrai (ex: dans une vue Admin), on affiche Modif/Suppr */}
        {showActions ? (
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 gap-2"
              onClick={(e) => {
                e.preventDefault(); // Empêche le clic sur la carte parente
                navigate(`/modifier-livre/${id}`);
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
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ) : (
          // Sinon, simple lien vers le détail
          <Link 
            to={`/livres/${id}`} 
            className="text-sm font-semibold text-secondary flex items-center gap-1 hover:gap-2 transition-all"
          >
            Voir les détails <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Overlay invisible pour rendre toute la carte cliquable vers le détail (si pas d'actions) */}
      {!showActions && (
        <Link 
          to={`/livres/${id}`} 
          className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary/50" 
          aria-label={`Voir le détail de ${titre}`}
        />
      )}
    </div>
  );
};

export default LivreCard;
