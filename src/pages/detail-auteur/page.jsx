import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit2, Trash2, Info, BookOpen, User } from 'lucide-react';
import api from '../../api/api';
import PageWrapper from '../../components/layout/PageWrapper';
import LivreCard from '../../components/LivreCard';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';

const DetailAuteurPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [auteur, setAuteur] = useState(null);
  const [livresAuteur, setLivresAuteur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auteurData = await api.getAuteurById(id);
        const tousLivres = await api.getLivres();
        const livresData = tousLivres.filter(l => l.auteur === parseInt(id));
        setAuteur(auteurData);
        setLivresAuteur(livresData);
      } catch (error) {
        setAuteur(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = () => {
    if (livresAuteur.length > 0) {
      alert("Impossible de supprimer cet auteur car il possède des livres associés.");
      setShowDeleteModal(false);
      return;
    }
    // Dans une version plus avancée, faire un fetch DELETE.
    console.log(`Suppression de l'auteur ${id} effectuée`);
    navigate('/auteurs');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (!auteur) {
    return (
      <PageWrapper>
        <EmptyState 
           message="Auteur introuvable" 
           subMessage="L'auteur que vous recherchez n'existe pas dans notre base de données." 
           icon={Info}
           action={<Link to="/auteurs"><Button>Retour aux auteurs</Button></Link>}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Link to="/auteurs" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Retour aux auteurs
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-xl" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative">
           <div className="flex items-center gap-6">
              <div className="p-5 bg-primary text-white rounded-2xl shadow-lg">
                 <User size={40} />
              </div>
              <div>
                 <h1 className="text-4xl font-extrabold text-primary mb-1">{auteur.nom}</h1>
                 <p className="text-secondary font-semibold uppercase tracking-widest text-xs">Profil Auteur</p>
              </div>
           </div>

           <div className="flex gap-3 w-full md:w-auto">
              <Link to={`/modifier-auteur/${id}`} className="flex-1 md:flex-none">
                 <Button variant="outline" className="gap-2 w-full">
                    <Edit2 size={18} /> Modifier
                 </Button>
              </Link>
              <Button 
                variant="danger" 
                className="gap-2 flex-1 md:flex-none"
                onClick={() => setShowDeleteModal(true)}
              >
                 <Trash2 size={18} /> Supprimer
              </Button>
           </div>
        </div>

        <div className="py-8 border-t border-gray-100">
           <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <Info size={20} className="text-tertiary" /> Biographie
           </h3>
           <p className="text-text-muted leading-relaxed max-w-3xl italic">
              « {auteur.biographie || "Aucune biographie disponible pour cet auteur."} »
           </p>
        </div>
      </div>

      <div className="mb-10">
         <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
            <BookOpen size={24} className="text-secondary" /> 
            Livres de cet auteur ({livresAuteur.length})
         </h2>

         {livresAuteur.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {livresAuteur.map(livre => (
                  <LivreCard 
                    key={livre.id} 
                    item={{ ...livre, auteurNom: auteur.nom }} 
                  />
               ))}
            </div>
         ) : (
            <div className="p-8 bg-surface rounded-2xl border-2 border-dashed border-gray-200 text-center text-text-muted">
               Cet auteur n'a pas encore de livres répertoriés.
            </div>
         )}
      </div>

      <Modal 
        isOpen={showDeleteModal}
        title={`Supprimer ${auteur.nom} ?`}
        message={
            livresAuteur.length > 0 
            ? "Impossible de supprimer cet auteur car il possède des livres dans notre catalogue. Supprimez ses livres avant de pouvoir supprimer l'auteur." 
            : `Êtes-vous sûr de vouloir supprimer définitivement "${auteur.nom}" de la base ?`
        }
        confirmText={livresAuteur.length > 0 ? "Compris" : "Confirmer la suppression"}
        onConfirm={livresAuteur.length > 0 ? () => setShowDeleteModal(false) : handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        variant={livresAuteur.length > 0 ? "primary" : "danger"}
      />

    </PageWrapper>
  );
};

export default DetailAuteurPage;
