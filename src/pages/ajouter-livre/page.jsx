import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Save, X } from 'lucide-react';
import { AUTEURS } from '../../data/mockData';
import PageWrapper from '../../components/layout/PageWrapper';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';

/**
 * Page Ajouter un Livre (Formulaire).
 * 
 * Objectifs :
 * 1. Gérer un état local 'formData' pour les champs du formulaire.
 * 2. Valider les données côté client (Erreurs locales).
 * 3. Simuler une soumission d'API (POST).
 */

const AjouterLivrePage = () => {
  const navigate = useNavigate();

  // État du formulaire
  const [formData, setFormData] = useState({
    titre: '',
    auteur: '',
    date_publication: '',
    disponible: true
  });

  // État des erreurs de validation
  const [errors, setErrors] = useState({});

  // Handler universel pour les changements d'inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // On efface l'erreur du champ dès que l'utilisateur tape dedans
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validation des champs
  const validate = () => {
    const newErrors = {};
    if (!formData.titre.trim()) newErrors.titre = "Le titre est obligatoire.";
    if (formData.titre.length < 2) newErrors.titre = "Le titre doit faire au moins 2 caractères.";
    if (!formData.auteur) newErrors.auteur = "Veuillez sélectionner un auteur.";
    if (!formData.date_publication) newErrors.date_publication = "La date est requise.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler de soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulation d'appel API
    console.log("Données envoyées : ", formData);
    
    // Dans une vraie app : fetch('/api/livres', { method: 'POST', body: JSON.stringify(formData) })
    
    // Redirection en cas de succès
    navigate('/livres');
  };

  return (
    <PageWrapper title="Nouveau livre">
      
      {/* Retour */}
      <Link to="/livres" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Annuler et revenir
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

          {/* Switch personnalisé pour la disponibilité */}
          <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-gray-100">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${formData.disponible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                   <Save size={20} />
                </div>
                <div>
                   <p className="text-sm font-bold text-primary">Disponible en rayon</p>
                   <p className="text-xs text-text-muted">Prêt immédiat possible</p>
                </div>
             </div>
             <input 
               type="checkbox" 
               name="disponible"
               checked={formData.disponible}
               onChange={handleChange}
               className="w-12 h-6 appearance-none bg-gray-200 checked:bg-secondary rounded-full relative cursor-pointer transition-colors before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-1 before:left-1 before:transition-transform checked:before:translate-x-6"
             />
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4 pt-6 border-t border-gray-50">
             <Button 
                variant="outline" 
                fullWidth 
                type="button" 
                onClick={() => navigate('/livres')}
                className="gap-2"
              >
                <X size={18} /> Annuler
             </Button>
             <Button 
                variant="primary" 
                fullWidth 
                type="submit"
                className="gap-2"
              >
                <Save size={18} /> Enregistrer le livre
             </Button>
          </div>

        </form>

      </div>

    </PageWrapper>
  );
};

export default AjouterLivrePage;
