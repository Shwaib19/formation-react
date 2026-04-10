import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Save, X, Info } from 'lucide-react';
import { AUTEURS, getLivreById } from '../../data/mockData';
import PageWrapper from '../../components/layout/PageWrapper';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';

/**
 * Page Modifier un Livre (Formulaire pré-rempli).
 * 
 * Objectifs :
 * 1. Récupérer l'ID dans l'URL.
 * 2. Charger les données du livre correspondant.
 * 3. Pré-remplir l'état 'formData'.
 * 4. Gérer la soumission (PUT) et la redirection.
 */

const ModifierLivrePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titre: '',
    auteur: '',
    date_publication: '',
    disponible: true
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // CHARGEMENT INITIAL DES DONNÉES
  useEffect(() => {
    const livre = getLivreById(id);
    if (livre) {
      setFormData(livre);
    }
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.titre.trim()) newErrors.titre = "Le titre est obligatoire.";
    if (!formData.auteur) newErrors.auteur = "Veuillez sélectionner un auteur.";
    if (!formData.date_publication) newErrors.date_publication = "La date est requise.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulation d'appel API
    console.log(`Mise à jour du livre ${id} avec : `, formData);
    
    // Dans une vraie app : fetch(`/api/livres/${id}`, { method: 'PUT', ... })
    
    // Redirection vers le détail
    navigate(`/livres/${id}`);
  };

  if (loading) return (
     <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
     </div>
  );

  if (!formData.titre && !loading) return (
    <PageWrapper>
       <EmptyState 
         message="Livre introuvable" 
         icon={Info}
         action={<Link to="/livres"><Button>Retour au catalogue</Button></Link>}
       />
    </PageWrapper>
  );

  return (
    <PageWrapper title={`Modifier : ${formData.titre}`}>
      
      {/* Retour */}
      <Link to={`/livres/${id}`} className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Annuler les modifications
      </Link>

      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <Input 
            label="Titre du livre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            placeholder="Ex: Les Misérables"
            error={errors.titre}
            required
          />

          <Select 
            label="Auteur"
            name="auteur"
            value={formData.auteur}
            onChange={handleChange}
            options={AUTEURS.map(a => ({ value: a.id, label: a.nom }))}
            placeholder="-- Choisir un auteur --"
            error={errors.auteur}
            required
          />

          <Input 
            label="Date de publication"
            name="date_publication"
            type="date"
            value={formData.date_publication}
            onChange={handleChange}
            error={errors.date_publication}
            required
          />

          <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-gray-100">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${formData.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                   <Save size={20} />
                </div>
                <div>
                   <p className="text-sm font-bold text-primary">Disponible en rayon</p>
                </div>
             </div>
             <input 
               type="checkbox" 
               name="disponible"
               checked={formData.disponible}
               onChange={handleChange}
               className="w-12 h-6 appearance-none bg-gray-200 checked:bg-secondary rounded-full relative cursor-pointer"
             />
          </div>

          <div className="flex gap-4 pt-6">
             <Button variant="outline" fullWidth type="button" onClick={() => navigate(`/livres/${id}`)}>
                <X size={18} /> Annuler
             </Button>
             <Button variant="primary" fullWidth type="submit">
                <Save size={18} /> Enregistrer les modifications
             </Button>
          </div>

        </form>

      </div>

    </PageWrapper>
  );
};

export default ModifierLivrePage;
