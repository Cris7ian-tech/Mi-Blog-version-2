import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

const TaskLabPage = () => {
  //La Lógica de Filtros
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const [newTaskName, setNewTaskName] = useState(""); // [task, setTask]

  //Mostrar Lista de tareas en pantalla
  const [taskItems, setTaskItems] = useState<Task[]>([]);

  // Ref para el input (Experiencia de usuario)
  const inputRef = useRef<HTMLInputElement>(null);

  //Creador de  nueva tarea comprobando que no exista en la lista para evitar duplicados, si no existe se agrega al estado de taskItems con un nuevo id generado por Date.now() y el estado de completed en false.
  const createTask = () => {
    //Ante todo Verificamos que no esté vacío (siempre es bueno)
    if (newTaskName.trim() === "") return;

    //Luego VERIFICACIÓN: ¿Ya existe?
    const exists = taskItems.find(
      (task) => task.task.toLowerCase() === newTaskName.toLowerCase(),
    );
    //console.log("¿Existe la tarea?", exists);

    if (!exists) {
      //Si NO existe, lo agregamos a la lista de tareas
      const updatedTasks = [
        ...taskItems,
        { id: Date.now(), task: newTaskName, completed: false },
      ];
      setTaskItems(updatedTasks);

      setNewTaskName(""); // Limpiamos el input
    } else {
      // Si existe, avisamos
      alert("¡Esa misión ya está asignada en el laboratorio!");
    }
  };

  //Cargar tareas desde el local storage al iniciar la página
  useEffect(() => {
    const data = localStorage.getItem("task_list");

    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []); // [] significa: "Hacé esto solo UNA VEZ al cargar la página"

  //Guardar tareas en el local storage
  //Se ejecuta CADA VEZ que 'taskItems' cambie
  useEffect(() => {
    localStorage.setItem("task_list", JSON.stringify(taskItems));
  }, [taskItems]); // Cada vez que cambie taskItems, guardamos la lista actualizada en el local storage

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask();
  };

  // Toggle Checklist:  ¡La casilla aparece tildada!
  const toggleTask = (id: number) => {
    setTaskItems(
      taskItems.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  //Borrar tarea
  const deleteTask = (id: number) => {
    // "Mantenemos todas las tareas cuyo ID sea distinto al que acabo de tocar"
    const updatedTasks = taskItems.filter((t) => t.id !== id);
    setTaskItems(updatedTasks);
  };

  const deleteAllTasks = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar todas las misiones?",
      )
    ) {
      setTaskItems([]); // Vaciamos el array y el useEffect hará el resto
    }
  };

  const filteredTasks = taskItems.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true; // "all"
  });

  //Contador de Misiones
  const completedCount = taskItems.filter((t) => t.completed).length;
  const totalCount = taskItems.length;
  // Calculamos el porcentaje para la barra de progreso
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Focus el input al cargar
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center p-8">
        {/* Encabezado */}
        <div className="flex items-center justify-center max-w-7xl mx-auto px-6 py-20 text-center">
          <NavLink to="/tasklab">
            <h2 className="text-2xl font-bold text-white group">
              <span className="text-[#DE8676] group-hover:text-[#F2F2F2] text-5xl transition-colors">
                Task
              </span>
              <span className="text-[#F2F2F2] group-hover:text-[#DE8676] text-5xl transition-colors">
                Lab
              </span>
            </h2>
            <p className="text-[#A1A1A1] mt-2 text-xl">
              Gestor de misiones con almacenamiento local y lógica CRUD.
            </p>
          </NavLink>
        </div>

        {/* Formulario de Entrada + Ref*/}
        <form
          onSubmit={handleCreateTask}
          className="flex flex-wrap justify-center gap-2"
        >
          <input
            ref={inputRef} // Vinculamos el Ref
            type="text"
            placeholder="Insert New task"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="px-4 py-2 rounded-sm bg-[#2D2F39] border border-[#373943] text-white focus:outline-none focus:ring-1 focus:ring-[#DE8676] w-full max-w-sm"
          />
          <button
            type="submit"
            className="text-white border border-amber-500 px-4 py-2 hover:bg-amber-500/10 transition-all rounded-sm font-mono text-sm uppercase"
          >
            Execute
          </button>
          <button
            type="button"
            onClick={deleteAllTasks}
            className="text-[#A1A1A1] border border-[#373943] px-4 py-2 hover:bg-red-500/10 hover:text-red-400 transition-all rounded-sm font-mono text-sm uppercase"
          >
            Delete All
          </button>
        </form>

        {/* --- SECCIÓN DE PROGRESO Y FILTROS --- */}
        {totalCount > 0 && (
          <div className="w-full max-w-sm mt-10 mb-6 animate-in fade-in duration-700">
            {/* Barra de Progreso */}
            <div className="mb-2 flex justify-between items-end">
              <span className="text-[#F2F2F2] text-xs uppercase tracking-[0.2em]">
                Sincronización
              </span>
              <span className="text-[#DE8676] font-mono text-sm">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="h-1 bg-[#2D2F39] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#DE8676] transition-all duration-700 ease-in-out shadow-[0_0_15px_#DE8676]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Botonera de Filtros */}
            <div className="flex justify-between mt-8 border-b border-[#373943] pb-2">
              {(["all", "active", "completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-[10px] uppercase tracking-[0.3em] transition-all ${
                    filter === f
                      ? "text-[#DE8676] border-b border-[#DE8676] mb-[-9px] pb-2"
                      : "text-[#A1A1A1] hover:text-white"
                  }`}
                >
                  {f === "all" ? "Data" : f === "active" ? "Pending" : "Done"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabla de Tareas Dinámica*/}
        <div className="w-full max-w-sm mt-4">
          <table className="w-full border-separate border-spacing-y-2">
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-[#A1A1A1] text-center py-12 border border-[#373943] rounded-sm opacity-50 italic text-sm"
                  >
                    {filter === "completed"
                      ? "No hay misiones cumplidas todavía."
                      : filter === "active"
                        ? "¡Felicidades! No quedan pendientes."
                        : "Laboratorio listo para nueva data."}
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="group animate-in slide-in-from-left-2 duration-300"
                  >
                    <td
                      className={`p-3 border border-[#373943] bg-[#2D2F39]/30 font-mono text-sm transition-all ${
                        task.completed
                          ? "opacity-30 line-through text-[#DE8676]"
                          : "text-white"
                      }`}
                    >
                      {task.task}
                    </td>
                    <td className="w-12 border border-[#373943] text-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="cursor-pointer accent-[#DE8676] w-4 h-4"
                      />
                    </td>
                    <td className="w-12 border border-[#373943] text-center">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-[#A1A1A1] hover:text-red-500 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default TaskLabPage;
