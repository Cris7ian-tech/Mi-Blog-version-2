import { useState } from "react";
import { NavLink } from "react-router-dom";

// interface TaskLabProps {
//   id: string;
//   task: string;
//   name: string;
//   completed: boolean;
// }


const TaskLabPage = () => {

  const [newTaskName, setNewTaskName] = useState(""); // [task, setTask]

  //Mostrar Lista de tareas en pantalla
  const [taskItems, setTaskItems] = useState([
    { id: 1, task: "Tarea 1", completed: false },
    { id: 2, task: "Tarea 2", completed: false },
    { id: 3, task: "Tarea 3", completed: false },
  ])

  //Creador de  nueva tarea comprobando que no exista en la lista para evitar duplicados, si no existe se agrega al estado de taskItems con un nuevo id generado por Date.now() y el estado de completed en false.
  const createTask = () => {

    alert("Creando Tarea: " + newTaskName);
    //Ante todo Verificamos que no esté vacío (siempre es bueno)
    if (newTaskName.trim() === "")  return;
      
    //Luego VERIFICACIÓN: ¿Ya existe?
    const exists = taskItems.find(task => task.task.toLowerCase() === newTaskName.toLowerCase());
    
    if (!exists) {
      //Si NO existe, lo agregamos a la lista de tareas
      const updatedTasks = [...taskItems, { id: Date.now(), task: newTaskName, completed: false }];
    setTaskItems(updatedTasks);

    // Guardamos la LISTA COMPLETA en el local storage (como texto)
    localStorage.setItem("task_list", JSON.stringify(updatedTasks))

    setNewTaskName(""); // Limpiamos el input
    } else {
      // Si existe, avisamos
    alert("¡Esa misión ya está asignada en el laboratorio!");
    }

    };

    const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask();
  
    }



  return (

    <>

    <section className="min-h-screen flex flex-col items-center justify-center p-8">

      {/* Card para Task Lab */}

      <div className="flex items-center justify-center max-w-7xl mx-auto px-6 py-20 text-center">

        <NavLink to="/tasklab">

          <h2 className="text-2xl font-bold text-white group-hover:text-[#DE8676]">

            <span className="text-[#DE8676] group-hover:text-text-[#F2F2F2] text-5xl">Task</span>

            <span className="text-[#F2F2F2] group-hover:text-[#DE8676] text-5xl">Lab</span>

          </h2>

          <p className="text-[#A1A1A1] mt-2 text-xl">

            Gestor de misiones con almacenamiento local y lógica CRUD.

          </p>

        </NavLink>

      </div>



      <form onSubmit={handleCreateTask} >

        <input
          type="text"
          placeholder="Insert New task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#2D2F39] border border-[#373943] text-white focus:outline-none focus:ring-2 focus:ring-[#DE8676] w-full max-w-sm mx-auto mb-8"
        />


        <button

          type="submit"
          className="text-white border border-amber-500 p-1.5 ml-2.5"
        >
          Save Task

        </button>



        <button

          onClick={() => alert("borrado")}
          className="text-white border border-amber-200 p-1.5 ml-2.5"
        >

          Delete All

        </button>

      </form>

      {/* tabla de tareas */}

      <table className="mt-10 w-full max-w-sm border-separate border-spacing-y-2">
        
        <thead>
          
          <tr>

            <th className="text-[#DE8676] text-left text-xs uppercase tracking-[0.3em] pb-4">Misiones en curso</th>

          </tr>

        </thead>

        <tbody>

          {taskItems.map((task) => (

            <tr key={task.id}>

              <td className="text-white border border-[#A0A0A0] p-2 text-xl italic font-bold tracking-widest">{task.task}</td>

            </tr>

          ))

          }

        </tbody>

      </table>

    </section>


    </>

  );
};    



export default TaskLabPage