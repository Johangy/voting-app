import { createClient } from '@supabase/supabase-js'

// 1. Inicializamos el cliente usando las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// --- FUNCIONES ---

// 2. LISTAR (GET): Conexión Directa a la Base de Datos
// Ya no llamamos a una API intermedia. El frontend pide los datos directo a Postgres.

export async function fetchPolls() {
  const { data, error } = await supabase
    .from('polls')
    .select(`
      id,
      title,
      options (
        id,
        text,
        votes
      )
    `)
    .order('id', { ascending: false }); // Orden de las encuestas (más nuevas arriba)
  
  if (error) {
    console.error("Error fetching polls:", error)
    throw error
  }

  // Ordenar las opciones de cada encuesta por ID en el cliente
  // Supabase a veces complica ordenar relaciones anidadas, hacerlo en JS es más seguro y rápido aquí.
  const pollsWithSortedOptions = data.map(poll => ({
    ...poll,
    options: poll.options.sort((a, b) => a.id - b.id) // Orden ascendente: Opción 1, 2, 3...
  }));

  return pollsWithSortedOptions;
}

// 3. CREAR (POST): Llamada a Edge Function
// Usamos la función porque crear una encuesta es complejo (insertar padre + hijos)
export async function createPoll(title, options) {
  const { data, error } = await supabase.functions.invoke('create-poll', {
    body: { title, options }
  })
  
  if (error) {
    console.error("Error creating poll:", error)
    throw error
  }
  return data
}

// 4. VOTAR (POST): Llamada a Edge Function
// Usamos la función para encapsular la lógica del voto
export async function vote(optionId) {
  const { data, error } = await supabase.functions.invoke('vote', {
    body: { optionId }
  })
  
  if (error) {
    console.error("Error voting:", error)
    throw error
  }
  return data
}

// 5. BORRAR (DELETE): Conexión Directa
// Gracias a la regla "ON DELETE CASCADE" en la base de datos, 
// al borrar la encuesta, se borran solas las opciones. No necesitamos backend.
export async function deletePoll(pollId) {
  const { error } = await supabase
    .from('polls')
    .delete()
    .eq('id', pollId)
  
  if (error) {
    console.error("Error deleting poll:", error)
    throw error
  }
}
