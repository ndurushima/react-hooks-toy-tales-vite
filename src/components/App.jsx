import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import {fetcher} from "../utils/fetcher"

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetcher("http://localhost:3001/toys")
      .then(setToys)
      .catch(error => console.error("Fetch toys:", error));
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleLike(toy) {
    fetcher(`http://localhost:3001/toys${toys.id}`, {
      method: "PATCH",
      body: JSON.stringify({ likes: toys.likes + 1})
    })
      .then(updatedToy =>
        setToys(prev =>
          prev.map(toy => (toy.id === updatedToy.id ? updatedToy : t))
        )
      )
      .catch(err => console.error("Update likes:", error));
  }

  function handleCreate(newToyData) {
    fetch(`http://localhost:3001/toys` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({newToyData})
     })
     .then(data => {
      if (!data.ok) {
        throw new Error("failed to create toy")
      }
      return data.json()
     })
     .then(newToy => setToys(prev => [...prev, newToy]))
     .catch(error => console.error("Create toy:", err));
  }

  function handleDelete(toyId) {
    fetcher(`http://localhost:3001/toys/${toyId}`, { method: "DELETE" })
      .then(() => setToys(prev => prev.filter(t => t.id !== toyId)))
      .catch(err => console.error("Delete toy:", err));
  }

  return (
    <>
      <Header />
      {showForm && <ToyForm onAdd={handleCreate} />}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDelete={handleDelete} onLike={handleLike} />
    </>
  );
}

export default App;
