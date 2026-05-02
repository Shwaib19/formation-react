import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, UserX } from 'lucide-react';
import api from '../../api/api';
import PageWrapper from '../../components/layout/PageWrapper';
import AuteurCard from '../../components/AuteurCard';
import SearchBar from '../../components/SearchBar';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';

const CatalogueAuteursPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [auteurs, setAuteurs] = useState([]);
  const [livres, setLivres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [auteursData, livresData] = await Promise.all([
          api.getAuteurs(),
          api.getLivres()
        ]);
        setAuteurs(auteursData);
        setLivres(livresData);
      } catch (error) {
        console.error("Erreur de chargement", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // FILTRAGE
  const auteursFiltrés = auteurs.filter((auteur) => 
    auteur.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageWrapper title="Nos auteurs">
      
      {/* Barre de recherche et action rapide */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Rechercher un auteur par son nom..."
            className="flex-1"
        />
        
        <Link to="/ajouter-auteur">
            <Button variant="secondary" className="gap-2">
              <Plus size={18} /> Ajouter un auteur
            </Button>
        </Link>
      </div>

      {/* Affichage de la grille */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : auteursFiltrés.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auteursFiltrés.map((auteur) => {
            const nbLivres = livres.filter(l => l.auteur === auteur.id).length;
            return (
              <AuteurCard 
                key={auteur.id} 
                item={{ ...auteur, nbLivres }} 
              />
            );
          })}
        </div>
      ) : (
        <EmptyState 
           message="Aucun auteur trouvé"
           subMessage="Essayez d'élargir vos critères de recherche ou d'ajouter un nouvel auteur à notre répertoire."
           icon={UserX}
           action={<Button onClick={() => setSearchTerm("")}>Voir tous les auteurs</Button>}
        />
      )}

    </PageWrapper>
  );
};

export default CatalogueAuteursPage;
