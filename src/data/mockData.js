/**
 * Données de test (Mock Data) pour le projet Biblio.
 * 
 * Pourquoi utiliser des Mock Data ?
 * 1. Permet de travailler sur le Frontend avant que le Backend ne soit prêt.
 * 2. Facilite le test des composants UI avec différents cas de figure.
 * 3. Sert de référence pour la structure des objets de données (Schémas).
 */

export const AUTEURS = [
  {
    id: 1,
    nom: "Victor Hugo",
    biographie: "Écrivain, poète et dramaturge français du XIXe siècle, figure proue du Romantisme.",
    nbLivres: 2
  },
  {
    id: 2,
    nom: "Albert Camus",
    biographie: "Écrivain, philosophe et journaliste français, Prix Nobel de littérature en 1957.",
    nbLivres: 1
  },
  {
    id: 3,
    nom: "Françoise Sagan",
    biographie: "Écrivaine française célèbre pour son premier roman 'Bonjour Tristesse'.",
    nbLivres: 1
  }
];

export const LIVRES = [
  {
    id: 1,
    titre: "Les Misérables",
    auteur: 1, // Référence à l'ID de Victor Hugo
    date_publication: "1862-04-03",
    disponible: true
  },
  {
    id: 2,
    titre: "Notre-Dame de Paris",
    auteur: 1,
    date_publication: "1831-01-14",
    disponible: false
  },
  {
    id: 3,
    titre: "L'Étranger",
    auteur: 2, // Albert Camus
    date_publication: "1942-06-15",
    disponible: true
  },
  {
    id: 4,
    titre: "Bonjour Tristesse",
    auteur: 3, // Françoise Sagan
    date_publication: "1954-03-15",
    disponible: true
  }
];

/**
 * Fonctions utilitaires pour simuler les appels API.
 * Ces fonctions pourront plus tard être remplacées par des appels 'fetch' vers le Backend Django.
 */
export const getAuteurById = (id) => AUTEURS.find(a => a.id === parseInt(id));
export const getLivreById = (id) => LIVRES.find(l => l.id === parseInt(id));
export const getLivresParAuteur = (auteurId) => LIVRES.filter(l => l.auteur === parseInt(auteurId));
