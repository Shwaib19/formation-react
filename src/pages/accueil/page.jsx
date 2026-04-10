import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { LIVRES, AUTEURS } from '../../data/mockData';
import PageWrapper from '../../components/layout/PageWrapper';
import LivreCard from '../../components/LivreCard';
import Button from '../../components/ui/Button';

/**
 * Page d'accueil de l'application.
 * 
 * Objectifs :
 * 1. Présenter l'application (Hero Section).
 * 2. Afficher des statistiques rapides (Utilisation de .length).
 * 3. Montrer les 3 derniers livres ajoutés (Utilisation de .slice).
 */

const AccueilPage = () => {
  // On récupère les 3 derniers livres (on suppose que les IDs les plus élevés sont les plus récents)
  // .slice(-3) prend les 3 derniers éléments du tableau.
  // .reverse() permet de voir le dernier ajouté en premier.
  const derniersLivres = [...LIVRES].slice(-3).reverse();

  // Statistiques simples
  const stats = [
    { label: "Livres au total", value: LIVRES.length, icon: BookOpen, color: "text-blue-600" },
    { label: "Auteurs référencés", value: AUTEURS.length, icon: Users, color: "text-purple-600" },
    { label: "Livres disponibles", value: LIVRES.filter(l => l.disponible).length, icon: CheckCircle, color: "text-green-600" },
  ];

  return (
    <PageWrapper fullWidth>
      
      {/* 1. SECTION HERO - Impression visuelle forte */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            Bienvenue sur <span className="text-tertiary underline decoration-secondary">Biblio</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Votre interface moderne de gestion de bibliothèque. 
            Explorez notre catalogue de livres et d'auteurs classiques et contemporains.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/livres">
              <Button size="lg" className="px-8 shadow-lg shadow-black/20">
                Parcourir le catalogue
              </Button>
            </Link>
            <Link to="/auteurs">
              <Button variant="outline" size="lg" className="px-8 border-white text-white hover:bg-white/10">
                Nos auteurs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SECTION STATS - Réassurance visuelle */}
      <section className="bg-white py-12 -mt-10 relative z-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((s, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-6 animate-in zoom-in-95 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <div className={`p-4 rounded-xl bg-gray-50 ${s.color}`}>
                  <s.icon size={32} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm font-medium text-text-muted uppercase tracking-wider">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION DERNIERS LIVRES - Dynamique */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-3xl font-bold text-primary">Récemment ajoutés</h2>
            <p className="text-text-muted mt-1">Découvrez les dernières pépites de notre collection.</p>
          </div>
          <Link to="/livres" className="hidden md:flex items-center gap-2 text-secondary font-bold hover:underline transition-all">
            Voir tout le catalogue <ArrowRight size={18} />
          </Link>
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {derniersLivres.map((livre) => {
            // On résout le nom de l'auteur depuis son ID
            const auteur = AUTEURS.find(a => a.id === livre.auteur);
            return (
              <LivreCard 
                key={livre.id} 
                item={{ ...livre, auteurNom: auteur?.nom }} 
              />
            );
          })}
        </div>
        
        {/* Lien mobile (en bas de grille) */}
        <div className="mt-10 md:hidden flex justify-center">
            <Link to="/livres" className="text-secondary font-bold flex items-center gap-2 hover:underline">
              Voir tout le catalogue <ArrowRight size={18} />
            </Link>
        </div>
      </section>

    </PageWrapper>
  );
};

export default AccueilPage;
