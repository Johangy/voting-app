//const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8081/api";
//const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8081/api";
const API_BASE = "/api";

export async function fetchPolls() {
  const res = await fetch(`${API_BASE}/polls`);
  return res.json();
}

export async function createPoll(title, options) {
  const res = await fetch(`${API_BASE}/polls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, options }),
  });
  return res.json();
}

export async function vote(optionId) {
  const res = await fetch(`${API_BASE}/polls/${optionId}/vote`, { method: "POST" });
  return res.json();
}

export async function deletePoll(pollId) {
  const res = await fetch(`${API_BASE}/polls/${pollId}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Error al eliminar la encuesta");
  }
}

