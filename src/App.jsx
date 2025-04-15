// Milestone 2: Implementare la ricerca ottimizzata
// Aggiungi un campo di ricerca (<input type="text">) sopra la lista dei politici.
// Permetti all’utente di filtrare i risultati in base a nome o biografia (se il testo cercato è incluso). Suggerimento: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca.
// ❌ Non usare useEffect per aggiornare l’array filtrato.

// Obiettivo: Migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia.

import React from "react";
import { useState, useEffect, useMemo } from "react";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchJson(url) {
      const response = await fetch(url);
      const data = await response.json();
      setPoliticians(data);
    }

    fetchJson('https://boolean-spec-frontend.vercel.app/freetestapi/politicians');
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const isInName = politician.name.toLowerCase().includes(search.toLowerCase());
      const isInBio = politician.biography.toLowerCase().includes(search.toLowerCase());
      return isInName || isInBio;
    })
  }, [politicians, search])

  return (
    <>
      <h1>Politici</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Cerca per nome o biografia"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <ul className="list">
        {filteredPoliticians.map(p => (
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
