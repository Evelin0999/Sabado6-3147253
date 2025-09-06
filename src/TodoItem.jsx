import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';

export default function TodoItem({ tarea, toggleCompleted, eliminarTarea, editarTarea }) {
  return (
    <div className="flex items-center gap-3 justify-between border-b border-gray-300 p-3 shadow-sm rounded">
      <span className={tarea.completed ? 'line-through' : 'text-gray-400'}>
        {tarea.text}
      </span>

      <div className="flex items-center gap-2">
        <input
          className="w-4 h-4"
          type="checkbox"
          checked={tarea.completed}
          onChange={() => toggleCompleted(tarea.id)}
        />

        {/* Botón de editar */}
        <button
          onClick={() => {
            const nuevoTexto = prompt('Editar tarea:', tarea.text);
            if (nuevoTexto && nuevoTexto.trim() !== '') {
              editarTarea(tarea.id, nuevoTexto.trim());
            }
          }}
        >
          <PencilIcon className="w-5 h-5 text-blue-500" />
        </button>

        {/* Botón de eliminar */}
        <button onClick={() => eliminarTarea(tarea.id)}>
          <TrashIcon className="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  );
}
