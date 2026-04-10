import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import des composants de Layout
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import EmptyState from './components/ui/EmptyState';

// Import des Pages
import AccueilPage from './pages/accueil/page';
import CatalogueLivresPage from './pages/catalogue-livres/page';
import DetailLivrePage from './pages/detail-livre/page';
import AjouterLivrePage from './pages/ajouter-livre/page';
import ModifierLivrePage from './pages/modifier-livre/page';

import CatalogueAuteursPage from './pages/catalogue-auteurs/page';
import DetailAuteurPage from './pages/detail-auteur/page';
import AjouterAuteurPage from './pages/ajouter-auteur/page';
import ModifierAuteurPage from './pages/modifier-auteur/page';

/**
 * Composant Racine de l'application (Main Application Entry).
 * 
 * Pourquoi cette structure ?
 * 1. React Router (BrowserRouter) englobe tout pour permettre la navigation.
 * 2. NavBar et Footer sont en dehors de <Routes> car ils sont constants sur toutes les pages.
 * 3. <Routes> définit le mapping entre une Path (URL) et un composant (Page).
 * 4. La route "*" gère les erreurs 404 (Page non trouvée).
 */

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white text-text-main font-sans selection:bg-tertiary/30">
        
        {/* Navigation - Toujours visible en haut */}
        <NavBar />

        {/* Zone de Contenu Dynamique - Change selon l'URL */}
        <main className="flex-grow">
          <Routes>
            {/* ACCUEIL */}
            <Route path="/" element={<AccueilPage />} />

            {/* CATALOGUE LIVRES */}
            <Route path="/livres" element={<CatalogueLivresPage />} />
            <Route path="/livres/:id" element={<DetailLivrePage />} />
            <Route path="/ajouter-livre" element={<AjouterLivrePage />} />
            <Route path="/modifier-livre/:id" element={<ModifierLivrePage />} />

            {/* CATALOGUE AUTEURS */}
            <Route path="/auteurs" element={<CatalogueAuteursPage />} />
            <Route path="/auteurs/:id" element={<DetailAuteurPage />} />
            <Route path="/ajouter-auteur" element={<AjouterAuteurPage />} />
            <Route path="/modifier-auteur/:id" element={<ModifierAuteurPage />} />

            {/* GESTION DES ERREURS 404 */}
            <Route 
              path="*" 
              element={
                <div className="flex items-center justify-center min-h-[60vh]">
                   <EmptyState 
                     message="404 - Page Introuvable" 
                     subMessage="Il semble que vous vous soyez perdu dans la bibliothèque..."
                   />
                </div>
              } 
            />
          </Routes>
        </main>

        {/* Pied de page - Toujours visible en bas */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
