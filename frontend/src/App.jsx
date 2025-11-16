import { useEffect, useState } from "react";
import { fetchPolls, createPoll, vote } from "./api";

function App() {
  const [polls, setPolls] = useState([]);
  const [title, setTitle] = useState("");
  const [optionText, setOptionText] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await fetchPolls();
    setPolls(data);
  }

  function addOption() {
    if (optionText.trim()) {
      setOptions([...options, optionText.trim()]);
      setOptionText("");
    }
  }

  async function handleCreatePoll() {
    if (!title.trim() || options.length === 0) return;
    await createPoll(title.trim(), options);
    setTitle("");
    setOptions([]);
    await load();
  }

  async function handleVote(optionId) {
    await vote(optionId);
    await load();
  }

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Sistema de Votación Simple</h1>

      <section style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
        <h2>Crear encuesta</h2>
        <input
          placeholder="Título de la encuesta"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "0.5rem" }}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            placeholder="Texto de opción"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
            style={{ flex: 1 }}
          />
          <button onClick={addOption}>Agregar opción</button>
        </div>
        <ul>
          {options.map((o, idx) => (<li key={idx}>{o}</li>))}
        </ul>
        <button onClick={handleCreatePoll}>Crear</button>
      </section>

      <section>
        <h2>Encuestas</h2>
        {polls.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
            <h3>{p.title}</h3>
            <ul>
              {p.options.map((o) => (
                <li key={o.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{o.text} — votos: {o.votes}</span>
                  <button onClick={() => handleVote(o.id)}>Votar</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
