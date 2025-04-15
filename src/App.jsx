// Milestone 1: Recuperare e visualizzare i dati
// Effettua una chiamata API a
// https://boolean-spec-frontend.vercel.app/freetestapi/politicians

// Salva la risposta in uno stato React (useState).

// Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

// Nome (name)
// Immagine (image)
// Posizione (position)
// Breve biografia (biography)

// Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.




import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [politicians, setPoliticians] = useState([]);

  useEffect(() => {
    async function fetchJson(url) {
      const response = await fetch(url);
      const data = await response.json();
      setPoliticians(data);
    }

    fetchJson('https://boolean-spec-frontend.vercel.app/freetestapi/politicians');
  }, []);

  return (
    <>
      <h1>Politici</h1>
      <ul className="list">
        {politicians.map(p => (
          <li key={p.id}>
            <div className="card">
              <div className="card-image">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="card-content">
                <span>{p.name}</span>
                <span>{p.position}</span>
                <span>{p.biography}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App;
