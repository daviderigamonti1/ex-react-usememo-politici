// Milestone 3: Ottimizzare il rendering delle card con React.memo
// Attualmente, ogni volta che l’utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate.
// Usa React.memo() per evitare il ri-render delle card quando le loro props non cambiano.
// Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario.

// Obiettivo: Se la lista filtrata cambia, solo le nuove card devono essere renderizzate, mentre le altre rimangono in memoria senza essere ridisegnate.

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

  const PoliticianCard = React.memo(({ name, image, position, biography }) => {
    console.log("Card", name);
    return (
      <div className="card">
        <div className="card-image">
          <img src={image} alt={name} />
        </div>
        <div className="card-content">
          <span>{name}</span>
          <span>{position}</span>
          <span>{biography}</span>
        </div>
      </div>
    )
  })

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
            <PoliticianCard {...p} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default App;
