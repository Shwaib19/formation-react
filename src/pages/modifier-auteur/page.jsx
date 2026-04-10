import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Save, X, Info } from 'lucide-react';
import { getAuteurById } from '../../data/mockData';
import PageWrapper from '../../components/layout/PageWrapper';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';

/**
 * Page Modifier un Auteur (Formulaire pré-rempli).
 * 
 * Objectifs :
 * 1. Charger les informations existantes de l'auteur.
 * 2. Mettre à jour les données (PUT simulation).
 * 3. Naviguer vers le profil mis à jour.
 */

const ModifierAuteurPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    biographie: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auteur = getAuteurById(id);
    if (auteur) {
      setFormData(auteur);
    }
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Le nom est obligatoire.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulation PUT
    console.log(`Mise à jour de l'auteur ${id} : `, formData);
    
    // Redirection vers le profil
    navigate(`/auteurs/${id}`);
  };

  if (loading) return (
     <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
     </div>
  );

  if (!formData.nom && !loading) return (
    <PageWrapper>
       <EmptyState 
         message="Auteur introuvable" 
         icon={Info}
         action={<Link to="/auteurs"><Button>Retour aux auteurs</Button></Link>}
       />
    </PageWrapper>
  );

  return (
    <PageWrapper title={`Modifier : ${formData.nom}`}>
      
      <Link to={`/auteurs/${id}`} className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Annuler les modifications
      </Link>

      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <Input 
            label="Nom complet de l'auteur"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            error={errors.nom}
            required
          />

          <div className="mb-4">
             <label className="block mb-1 text-xs font-semibold text-text-muted uppercase tracking-wider text-left">
               Biographie
             </label>
             <textarea 
               name="biographie"
               rows="5"
               value={formData.biographie}
               onChange={handleChange}
               className="block w-full px-4 py-2 text-sm text-text-main border border-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
             />
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-50">
             <Button variant="outline" fullWidth type="button" onClick={() => navigate(`/auteurs/${id}`)}>
                <X size={18} /> Annuler
             </Button>
             <Button variant="primary" fullWidth type="submit" className="gap-2">
                <Save size={18} /> Mettre à jour
             </Button>
          </div>

        </form>

      </div>

    </PageWrapper>
  );
};

export default ModifierAuteurPage;
