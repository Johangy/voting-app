import { useEffect, useState } from "react";
import { fetchPolls, createPoll, vote, deletePoll } from "./api";

function App() {
  const [polls, setPolls] = useState([]);
  const [title, setTitle] = useState("");
  const [optionText, setOptionText] = useState("");
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [voteMessagePollId, setVoteMessagePollId] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const data = await fetchPolls();

    // Ordenar encuestas: más nuevas primero (id mayor arriba)
    const sortedPolls = data.sort((a, b) => b.id - a.id);
    setPolls(sortedPolls);
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
    setMessage("Encuesta registrada exitosamente");
    setTimeout(() => setMessage(""), 3000); // se borra en 3 segundos
  }

  async function handleVote(optionId, pollId) {
    await vote(optionId);
    await load();
    setVoteMessagePollId(pollId);
    setTimeout(() => setVoteMessagePollId(null), 3000);
  }

  async function handleDeletePoll(pollId) {
    if (window.confirm("¿Seguro que deseas eliminar esta encuesta?")) {
      try {
        await deletePoll(pollId);
        await load();
      } catch (err) {
        alert("Error al eliminar la encuesta");
      }
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", textAlign: "center" }}>
      <h1 style={{
        fontSize: "3rem",
        fontWeight: "700",
        background: "linear-gradient(90deg, #00c6ff, #0072ff)", 
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0 4px 12px rgba(0, 114, 255, 0.6)",
        letterSpacing: "2px",
        marginBottom: "1.5rem"
      }}>
        Sistema de Votación
      </h1>


      {/* Crear encuesta */}
      <section style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: "12px",
        padding: "1.5rem",
        marginBottom: "2rem",
        boxShadow: "0 8px 20px rgba(0, 150, 255, 0.3), 0 4px 10px rgba(0,0,0,0.4)" 
      }}>
        <h2 style={{ color: "#1abc9c" }}>Crear encuesta</h2>
        {message && (
          <div style={{
            background: "#2ecc71",
            color: "white",
            padding: "0.5rem",
            borderRadius: "6px",
            marginBottom: "1rem"
          }}>
            {message}
          </div>
        )}
        <input
          placeholder="Título de la encuesta"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <input
            placeholder="Texto de opción"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
            style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <button onClick={addOption} className="btn-blue">Agregar opción</button>
        </div>
        <ul>
          {options.map((o, idx) => (<li key={idx} style={{ color: "#ecf0f1" }}>{o}</li>))}
        </ul>
        <button onClick={handleCreatePoll} className="btn-green">Crear encuesta</button>
      </section>

      {/* Listado de encuestas */}
      <section>
        <h2 style={{ color: "#1abc9c" }}>Encuestas</h2>
        {polls.map((p) => (
          <div key={p.id} style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "1rem",
            marginBottom: "1rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ color: "#f39c12", margin: 0 }}>{p.title}</h3>
              <button onClick={() => handleDeletePoll(p.id)} className="btn-red">Eliminar</button>
            </div>

            {voteMessagePollId === p.id && (
              <div style={{
                background: "#3498db",
                color: "white",
                padding: "0.5rem",
                borderRadius: "6px",
                margin: "0.5rem 0"
              }}>
                Voto registrado exitosamente
              </div>
            )}

            <ul style={{ marginTop: "0.5rem", listStyle: "none", padding: 0 }}>
              {p.options.map((o) => (
                <li key={o.id} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.3rem 0",
                  color: "#ecf0f1"
                }}>
                  <span>{o.text} — votos: {o.votes}</span>
                  <button onClick={() => handleVote(o.id, p.id)} className="btn-blue">Votar</button>
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
