// Bonus: Filtrare anche per posizione politica (position)
// Creare un array derivato che contiene tutte le posizioni politiche (position) disponibili, ma senza duplicati.
// Aggiungere un <select> sopra la lista che permette di filtrare i politici anche in base alla loro posizione.
// Modificare l’array filtrato per tenere conto sia della stringa di ricerca, sia della posizione selezionata.

import React from "react";
import { useState, useEffect, useMemo } from "react";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  useEffect(() => {
    async function fetchJson(url) {
      const response = await fetch(url);
      const data = await response.json();
      setPoliticians(data);
    }
    fetchJson('https://boolean-spec-frontend.vercel.app/freetestapi/politicians');
  }, []);

  const positions = useMemo(() => {
    return politicians.reduce((acc, p) => {
      if (!acc.includes(p.position)) {
        return [...acc, p.position];
      }
      return acc;
    }, []);
  }, [politicians]);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const isInName = politician.name.toLowerCase().includes(search.toLowerCase());
      const isInBio = politician.biography.toLowerCase().includes(search.toLowerCase());
      const isPositionValid = selectedPosition === '' || selectedPosition === politician.position;
      return (isInName || isInBio) && isPositionValid;
    })
  }, [politicians, search, selectedPosition])

  const PoliticianCard = React.memo(({ name, image, position, biography }) => {
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
        <select
          value={selectedPosition}
          onChange={e => setSelectedPosition(e.target.value)}
        >
          <option value="">Filtra per posizione</option>
          {positions.map((position, index) => (
            <option key={index} value={position}>{position}</option>
          ))}
        </select>
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
