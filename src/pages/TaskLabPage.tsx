import { useState } from "react";


// interface TaskLabProps {
//   id: string;
//   task: string;
//   completed: boolean;
// }

const TaskLabPage = () => {
  const [newTaskName, setNewTaskName] = useState(""); // [task, setTask]
  

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("task", newTaskName);
    setNewTaskName("");
  }

  return (
    <>
    {/* Card para Task Lab */}
      <div className="flex iyems-center justify-center max-w-7xl mx-auto px-6 py-20 text-center">
        <NavLink to="/tasklab">
          <h2 className="text-2xl font-bold text-white group-hover:text-[#DE8676]">
            Task Lab
          </h2>
          <p className="text-[#A1A1A1] mt-2">
            Gestor de misiones con almacenamiento local y lógica CRUD.
          </p>
        </NavLink>
      </div>

      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Insert New task"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#2D2F39] border border-[#373943] text-white focus:outline-none focus:ring-2 focus:ring-[#DE8676] w-full max-w-sm mx-auto mb-8"
        />

        <button
          onClick={() => alert(newTaskName)}
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
    </>
  );
};    

export default TaskLabPage