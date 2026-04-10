import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * Point d'entrée principal de l'application (Entry Point).
 * 
 * Pourquoi ce fichier ?
 * 1. React DOM crée un 'root' lié au div #root du fichier index.html.
 * 2. ReactDOM.createRoot().render() lance l'application React.
 * 3. On importe index.css ici pour injecter Tailwind dans tout le projet.
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
