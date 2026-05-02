const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const api = {
    // --- AUTEURS ---
    getAuteurs: async () => {
        const response = await fetch(`${API_BASE_URL}/auteurs/`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des auteurs');
        return response.json();
    },
    
    getAuteurById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/auteurs/${id}/`);
        if (!response.ok) throw new Error('Erreur lors de la récupération de l\'auteur');
        return response.json();
    },
    
    createAuteur: async (data) => {
        const response = await fetch(`${API_BASE_URL}/auteurs/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erreur lors de la création de l\'auteur');
        return response.json();
    },

    // --- LIVRES ---
    getLivres: async () => {
        const response = await fetch(`${API_BASE_URL}/livres/`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des livres');
        return response.json();
    },
    
    getLivreById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/livres/${id}/`);
        if (!response.ok) throw new Error('Erreur lors de la récupération du livre');
        return response.json();
    },
    
    createLivre: async (data) => {
        const response = await fetch(`${API_BASE_URL}/livres/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erreur lors de la création du livre');
        return response.json();
    }
};

export default api;
