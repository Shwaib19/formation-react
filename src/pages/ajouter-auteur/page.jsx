import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, UserPlus, Save, X } from 'lucide-react';
import PageWrapper from '../../components/layout/PageWrapper';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

/**
 * Page Ajouter un Auteur (Formulaire).
 * 
 * Objectifs :
 * 1. Créer un nouvel auteur (Localement pour le moment).
 * 2. Valider le nom de l'auteur.
 * 3. Utiliser un Textarea stylé pour la biographie.
 */

const AjouterAuteurPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    biographie: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom.trim()) newErrors.nom = "Le nom de l'auteur est obligatoire.";
    if (formData.nom.length < 2) newErrors.nom = "Le nom doit comporter au moins 2 caractères.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulation POST API
    console.log("Nouvel auteur : ", formData);
    
    // Redirection vers le catalogue auteurs
    navigate('/auteurs');
  };

  const textareaClasses = `
    block w-full px-4 py-2 text-sm text-text-main border rounded-lg transition-colors focus:outline-none focus:ring-2 bg-white
    ${errors.biographie ? 'border-red-500 focus:ring-red-500' : 'border-tertiary focus:ring-primary'}
  `;

  return (
    <PageWrapper title="Nouveau profil auteur">
      
      <Link to="/auteurs" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group">
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Annuler et revenir aux auteurs
      </Link>

      <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="text-center mb-8">
             <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <UserPlus size={40} />
             </div>
             <p className="text-sm text-text-muted">Remplissez les informations pour créer la fiche auteur.</p>
          </div>

          <Input 
            label="Nom complet de l'auteur"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Ex: Victor Hugo"
            error={errors.nom}
            required
          />

          <div className="mb-4">
             <label className="block mb-1 text-xs font-semibold text-text-muted uppercase tracking-wider">
               Biographie
             </label>
             <textarea 
               name="biographie"
               rows="5"
               value={formData.biographie}
               onChange={handleChange}
               className={textareaClasses}
               placeholder="Décrivez brièvement le parcours de l'auteur..."
             />
          </div>

          <div className="flex gap-4 pt-6">
             <Button variant="outline" fullWidth type="button" onClick={() => navigate('/auteurs')}>
                <X size={18} /> Annuler
             </Button>
             <Button variant="primary" fullWidth type="submit" className="gap-2">
                <Save size={18} /> Enregistrer l'auteur
             </Button>
          </div>

        </form>

      </div>

    </PageWrapper>
  );
};

export default AjouterAuteurPage;
