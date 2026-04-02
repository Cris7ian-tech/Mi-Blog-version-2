import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Task {
  id: number;
  task: string;
  completed: boolean;
}


const TaskLabPage = (  ) => {

  const [newTaskName, setNewTaskName] = useState(""); // [task, setTask]

  //Mostrar Lista de tareas en pantalla
  const [taskItems, setTaskItems] = useState<Task[]>([]);

  //Creador de  nueva tarea comprobando que no exista en la lista para evitar duplicados, si no existe se agrega al estado de taskItems con un nuevo id generado por Date.now() y el estado de completed en false.
  const createTask = () => {

    //Ante todo Verificamos que no esté vacío (siempre es bueno)
    if (newTaskName.trim() === "")  return;
      
    //Luego VERIFICACIÓN: ¿Ya existe?
    const exists = taskItems.find(task => task.task.toLowerCase() === newTaskName.toLowerCase());
    //console.log("¿Existe la tarea?", exists);  

    if (!exists) {
      //Si NO existe, lo agregamos a la lista de tareas
      const updatedTasks = [...taskItems, { id: Date.now(), task: newTaskName, completed: false }];
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
    }, []) // [] significa: "Hacé esto solo UNA VEZ al cargar la página"



    //Guardar tareas en el local storage
    //Se ejecuta CADA VEZ que 'taskItems' cambie
    useEffect(() => {
      localStorage.setItem("task_list", JSON.stringify(taskItems));
    }, [taskItems]) // Cada vez que cambie taskItems, guardamos la lista actualizada en el local storage



    const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask();
  
    }



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
      if (window.confirm("¿Estás seguro de que quieres eliminar todas las misiones?")) {
        setTaskItems([]); // Vaciamos el array y el useEffect hará el resto
      }
    };



    //Contador de Misiones
    const completedCount = taskItems.filter(t => t.completed).length;
      const totalCount = taskItems.length;



  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center p-8">
        
        {/* Encabezado */}
        <div className="flex items-center justify-center max-w-7xl mx-auto px-6 py-20 text-center">
          <NavLink to="/tasklab">
            <h2 className="text-2xl font-bold text-white group">
              <span className="text-[#DE8676] group-hover:text-[#F2F2F2] text-5xl transition-colors">Task</span>
              <span className="text-[#F2F2F2] group-hover:text-[#DE8676] text-5xl transition-colors">Lab</span>
            </h2>
            <p className="text-[#A1A1A1] mt-2 text-xl">
              Gestor de misiones con almacenamiento local y lógica CRUD.
            </p>
          </NavLink>
        </div>

        {/* Formulario de Entrada */}
        <form onSubmit={handleCreateTask} className="flex flex-wrap justify-center gap-2">
          <input
            type="text"
            placeholder="Insert New task"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="px-4 py-2 rounded-md bg-[#2D2F39] border border-[#373943] text-white focus:outline-none focus:ring-2 focus:ring-[#DE8676] w-full max-w-sm"
          />
          <button
            type="submit"
            className="text-white border border-amber-500 px-4 py-2 mt-2 hover:bg-amber-500/10 transition-all"
          >
            Save Task
          </button>
          <button
            type="button"
            onClick={deleteAllTasks}
            className="text-white border border-amber-200 px-4 py-2 mt-2 hover:bg-amber-200/10 transition-all"
          >
            Delete All
          </button>
        </form>

        {/* 1. Contador de Progreso (Renderizado Condicional) */}
        {totalCount > 0 && (
          <div className="mt-14 mb-6 text-[#A1A1A1] text-sm uppercase tracking-widest animate-pulse">
            Progreso: <span className="text-[#DE8676] font-bold">{completedCount}</span> de <span className="text-white">{totalCount}</span> misiones cumplidas
          </div>
        )}

        {/* Tabla de Tareas */}
        <table className="mt-4 w-full max-w-sm border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="text-[#DE8676] text-left text-xs uppercase tracking-[0.3em] pb-4">
                Misiones en curso
              </th>
            </tr>
          </thead>
          <tbody>
            {totalCount === 0 ? (
              <tr>
                <td colSpan={3} className="text-[#A1A1A1] italic text-center py-10 border border-dashed border-[#373943] rounded-lg">
                  El laboratorio está despejado. <br />
                  <span className="text-xs">Introduce una nueva misión para comenzar.</span>
                </td>
              </tr>
            ) : (
              taskItems.map((task) => (
                <tr key={task.id} className="group">
                  <td
                    className={`text-[#A1A1A1] border border-[#A0A0A0] p-2 text-xl italic font-bold tracking-widest transition-all ${
                      task.completed ? "line-through opacity-40 text-[#DE8676]" : "text-white"
                    }`}
                  >
                    {task.task}
                  </td>
                  <td className="p-2 border border-[#A0A0A0] text-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="cursor-pointer accent-[#DE8676] w-5 h-5"
                    />
                  </td>
                  <td className="p-2 border border-[#A0A0A0] text-center">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-[#A1A1A1] hover:text-red-400 transition-colors p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};    



export default TaskLabPage