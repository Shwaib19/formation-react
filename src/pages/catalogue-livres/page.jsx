import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FilterX } from 'lucide-react';
import { LIVRES, AUTEURS } from '../../data/mockData';
import PageWrapper from '../../components/layout/PageWrapper';
import LivreCard from '../../components/LivreCard';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';

/**
 * Page Catalogue des Livres.
 * 
 * Objectifs :
 * 1. Lister tous les livres en combinant les données des livres et des auteurs.
 * 2. Gérer le filtrage en temps réel (Search et Disponibilité).
 * 3. Simuler un état de chargement initial.
 */

const CatalogueLivresPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulation d'un chargement réseau de 800ms au montage du composant
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // FILTRAGE DES DONNÉES
  // On filtre en fonction du terme de recherche ET de la disponibilité
  const livresFiltrés = LIVRES.filter((livre) => {
    // On résout le nom de l'auteur pour pouvoir aussi chercher par auteur
    const auteur = AUTEURS.find(a => a.id === livre.auteur);
    const matchesSearch = 
      livre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auteur?.nom.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAvailable = showOnlyAvailable ? livre.disponible : true;

    return matchesSearch && matchesAvailable;
  });

  return (
    <PageWrapper title="Catalogue des livres">
      
      {/* 1. BARRE DE FILTRES ET ACTION */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        
        {/* Recherche */}
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Rechercher par titre ou auteur..."
          className="flex-1"
        />

        {/* Filtre disponibilité et Petit Bouton Ajouter */}
        <div className="flex items-center gap-6 w-full md:w-auto">
          <label className="flex items-center gap-3 cursor-pointer group text-text-muted hover:text-primary transition-colors">
            <input 
              type="checkbox" 
              checked={showOnlyAvailable}
              onChange={(e) => setShowOnlyAvailable(e.target.checked)}
              className="w-5 h-5 accent-secondary cursor-pointer rounded-md"
            />
            <span className="text-sm font-semibold whitespace-nowrap">Disponibles uniquement</span>
          </label>
          
          <Link to="/ajouter-livre">
            <Button variant="secondary" className="gap-2">
              <Plus size={18} /> <span className="hidden sm:inline">Nouveau livre</span>
            </Button>
          </Link>
        </div>

      </div>

      {/* 2. AFFICHAGE DES RÉSULTATS */}
      {loading ? (
        // État de chargement (Skeleton simple)
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : livresFiltrés.length > 0 ? (
        // Grille de résultats
        <>
          <p className="text-sm text-text-muted mb-6">
            <span className="font-bold text-primary">{livresFiltrés.length}</span> livres trouvés
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {livresFiltrés.map((livre) => {
              const auteur = AUTEURS.find(a => a.id === livre.auteur);
              return (
                <LivreCard 
                  key={livre.id} 
                  item={{ ...livre, auteurNom: auteur?.nom }} 
                />
              );
            })}
          </div>
        </>
      ) : (
        // État vide si aucun résultat
        <EmptyState 
          message="Aucun livre ne correspond à votre recherche"
          subMessage="Essayez d'ajuster vos filtres ou d'ajouter un nouveau livre à la collection."
          icon={FilterX}
          action={
            <Button onClick={() => {setSearchTerm(""); setShowOnlyAvailable(false);}}>
              Réinitialiser les filtres
            </Button>
          }
        />
      )}

    </PageWrapper>
  );
};

export default CatalogueLivresPage;
