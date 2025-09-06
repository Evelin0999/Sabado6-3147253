import TodoItem from "./TodoItem"
import { useState } from "react"

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [input, setInput] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  const agregarTarea = () => {
    if (input.trim()) {
      setTareas([...tareas, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput("");
    };
  }

  const toggleCompleted = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  }

  const iniciarEdicion = (id, texto) => {
    setEditandoId(id);
    setTextoEditado(texto);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setTextoEditado("");
  };

  const guardarEdicion = () => {
    if (textoEditado.trim()) {
      setTareas(
        tareas.map((tarea) =>
          tarea.id === editandoId ? { ...tarea, text: textoEditado.trim() } : tarea
        )
      );
      setEditandoId(null);
      setTextoEditado("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-2 rounded shadow">
      <h1 className="text-3xl font-bold mb-5 text-center">LISTA DE TAREAS</h1>
      
     
      <div className="flex gap-3 mb-5">
        {editandoId ? (
          <>
            <input 
              className="flex-1 p-2 border rounded" 
              type="text" 
              value={textoEditado} 
              onChange={(e) => setTextoEditado(e.target.value)} 
              placeholder="Editar tarea" 
            />
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded" 
              onClick={guardarEdicion}
            >
              Guardar
            </button>
            <button 
              className="bg-gray-500 text-white px-4 py-2 rounded" 
              onClick={cancelarEdicion}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <input 
              className="flex-1 p-2 border rounded" 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Añadir Tarea" 
            />
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded" 
              onClick={agregarTarea}
            >
              Añadir Tarea
            </button>
          </>
        )}
      </div>

      <div className="space-y-2">
        {tareas.map((tarea) => (
          <TodoItem 
            key={tarea.id} 
            tarea={tarea} 
            toggleCompleted={toggleCompleted} 
            eliminarTarea={eliminarTarea}
            iniciarEdicion={iniciarEdicion}
            esEditando={editandoId === tarea.id}
          />
        ))}
      </div>
    </div>
  )
}