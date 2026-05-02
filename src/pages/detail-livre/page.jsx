import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit2, Trash2, Calendar, User, Info, CheckCircle, XCircle } from 'lucide-react';
import api from '../../api/api';
import PageWrapper from '../../components/layout/PageWrapper';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';

const DetailLivrePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [livre, setLivre] = useState(null);
  const [auteur, setAuteur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataLivre = await api.getLivreById(id);
        setLivre(dataLivre);
        if (dataLivre.auteur) {
            const dataAuteur = await api.getAuteurById(dataLivre.auteur);
            setAuteur(dataAuteur);
        }
      } catch (error) {
        setLivre(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = () => {
    // Dans une version plus avancée, faire un fetch DELETE.
    console.log(`Suppression du livre ${id} demandée`);
    setShowDeleteModal(false);
    navigate('/livres');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  if (!livre) return (
    <PageWrapper>
      <EmptyState 
        message="Livre introuvable" 
        subMessage="Le livre que vous recherchez semble ne pas exister ou a été retiré." 
        icon={Info}
        action={<Link to="/livres"><Button>Retour au catalogue</Button></Link>}
      />
    </PageWrapper>
  );

  return (
    <PageWrapper>
      <Link to="/livres" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Retour au catalogue
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative">
          <div>
            <h1 className="text-4xl font-extrabold text-primary mb-4 leading-tight">
              {livre.titre}
            </h1>
            <Badge 
              label={livre.disponible ? "Disponible en rayon" : "Actuellement indisponible"} 
              variant={livre.disponible ? "success" : "error"} 
              className="px-4 py-1.5 text-sm"
            />
          </div>
          
          <div className="flex gap-3">
             <Link to={`/modifier-livre/${id}`}>
                <Button variant="outline" className="gap-2 w-full md:w-auto">
                    <Edit2 size={18} /> Modifier
                </Button>
             </Link>
             <Button 
               variant="danger" 
               className="gap-2 w-full md:w-auto"
               onClick={() => setShowDeleteModal(true)}
             >
                <Trash2 size={18} /> Supprimer
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10 border-t border-gray-100">
          
          <div className="flex items-start gap-5 group">
            <div className="p-4 bg-tertiary/10 rounded-2xl text-primary group-hover:bg-tertiary/30 transition-colors">
                <User size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Auteur</p>
              <Link 
                to={`/auteurs/${auteur?.id}`} 
                className="text-xl font-bold text-primary hover:text-secondary underline decoration-tertiary decoration-2 underline-offset-4"
              >
                {auteur?.nom || "Inconnu"}
              </Link>
              <p className="text-sm text-text-muted mt-2 line-clamp-2 max-w-sm">
                Découvrez tous les ouvrages de cet auteur emblématique.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="p-4 bg-secondary/10 rounded-2xl text-secondary">
                <Calendar size={32} />
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Date de publication</p>
              <p className="text-xl font-bold text-primary">
                {new Date(livre.date_publication).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p className="text-sm text-text-muted mt-2">
                Édition originale répertoriée dans notre base.
              </p>
            </div>
          </div>

        </div>

        <div className={`mt-10 p-6 rounded-2xl flex items-center gap-4 ${livre.disponible ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {livre.disponible ? <CheckCircle size={24} /> : <XCircle size={24} />}
            <span className="font-semibold">
                {livre.disponible 
                  ? "Ce livre est présent en bibliothèque et peut être emprunté immédiatement."
                  : "Désolé, ce livre n'est pas disponible pour le moment."}
            </span>
        </div>
      </div>

      <Modal 
        isOpen={showDeleteModal}
        title="Supprimer ce livre ?"
        message={`Êtes-vous sûr de vouloir supprimer définitivement "${livre.titre}" ? Cette action est irréversible.`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

    </PageWrapper>
  );
};

export default DetailLivrePage;
