import { useEffect, useState } from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import useLocalStorage from "./Hooks/LocalStorage";
import {DragDropContext , Droppable , Draggable} from "@hello-pangea/dnd";
 
function AddTask() {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium priority");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [successMessage , setSuccessMessage] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter , setFilter] = useState("All");
  const [searchTask , setSearchTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("medium priority");
  const priorityOptions = ["low priority", "medium priority", "high priority"];
 
  const handleSubmit = (e) => {

    e.preventDefault();
 
    if (title.trim() === "") {
      setError("Please enter a  valid title for the task.");
      return;
    }

    setError("");
 
    const newTask = {
      id: Date.now().toString(), // Unique ID based on timestamp
      title: title.trim(),
      description: description.trim(),
      priority,
      completed,
    };
 
    setTasks((prev) => [newTask , ...prev]);

    setSuccessMessage("Task added successfully");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);

    setTitle("");
    setDescription("");
    setPriority("medium priority");
    setCompleted(false);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const startEditTask = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
  };

  const saveTask = () => {
    if (editTitle.trim() === "") return;
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === editId
          ? { ...t, title: editTitle, description: editDescription, priority: editPriority }: t
      )
    );

    setEditId(null);
  };
 
  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleOnDrag = (result) => {
    if(!result.destination) return;

    const reordered = [...filteredTasks];

    const [removed] = reordered.splice(result.source.index , 1);
    reordered.splice(result.destination.index , 0 , removed);

    setTasks((prevTasks) => {
      const remainingTasks = prevTasks.filter(
        task => !filteredTasks.some(ft => ft.id === task.id)
      );
      return [...reordered , ...remainingTasks]
    });
  }

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = 
    filter === "All" ? true :
    filter === "Active" ? !task.completed :
    task.completed;
    
  const searchMatch = task.title.toLowerCase().includes(searchTask.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-5xl font-bold mb-8 text-gray-900 text-center pt-10">Task Manager</h1>
      <div className="bg-white p-6 rounded-xl shadow-md w-full mt-10 border border-gray-100">
        <h2 className="font-semibold mb-5 text-gray-800 text-lg">Add a New Task</h2>
        {successMessage && (
          <div className="mb-4 p-3 text-green-600 font-medium text-center">
            {successMessage}
            </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input 
              className="border p-2 w-full border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-shadow text-sm"
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => { 
                setTitle(e.target.value);
                if (e.target.value.trim()) setError("");
              }}
          />
          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
          <textarea 
              className="border p-2 w-full border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-shadow text-sm"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          <div className="flex flex-wrap gap-3">
            <select 
              className="border p-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors text-sm"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
            {priorityOptions.map((option) => (
            <option key={option} value={option}>
              {option[0].toUpperCase() + option.slice(1)}
            </option>
            ))}
            </select>
          </div>
          <button type="submit" className="bg-teal-700 text-white p-2.5 w-full rounded-xl hover:bg-teal-600 font-medium transition-colors shadow-sm">
            Add Task
          </button>
        </form>
      </div>

      <div className="mt-12 pb-12">
         <div className="mb-6 max-w-md">
        <div className="relative">
          <input 
          type="text"
          placeholder="Search for a task by title.."
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
          className="w-full pl-4 py-2.5 pr-10 bg-white border border-gray-300 rounded-xl outline-none foucus:ring-2 foucus-ring-blue-300 text-sm transition-shadow shadow-sm"
          />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Task Items</h2>
      <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-sm w-full self-start sm:self-auto">
        {["All", "Active", "Completed"].map(status => (
          <button 
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === status
                ? "bg-teal-700 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <DragDropContext onDragEnd = {handleOnDrag}>
        <Droppable droppableId = "task-list">
          {(provided) => (
            <div className="space-y-4"
            {...provided.droppableProps}
            ref = {provided.innerRef}>
              {filteredTasks.length === 0 ? (

            <div className="text-center py-12 px-4 bg-white border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center">
              <p className="text-base font-semibold text-gray-500">
                {filter === "All" ? "Your task list is empty" : `No ${filter.toLowerCase()} tasks found`}
              </p>
            </div>
          ) : (
            filteredTasks.map((task,index) => (
          <Draggable
            key={String(task.id)}
            draggableId={String(task.id)}
            index={index}>
              {(provided, snapshot) => (
                <div 
                ref={provided.innerRef}
                {...provided.draggableProps}
                  className={`bg-white border border-gray-200 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow 
              ${task.completed ? "bg-gray-50 opacity-75" : ""}
              ${snapshot.isDragging ? "shadow-2xl border-teal-500 scale-[1.01] bg-teal-50/10" : "hover:shadow-md"}`}
          >
            {editId === task.id ? (
          <EditTask 
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            editPriority={editPriority}
            setEditPriority={setEditPriority}
            onSave={saveTask}
          />
          ) : (
        <>
          <div {...provided.dragHandleProps}
             className="text-gray-400 cursor-grab active:cursor-grabbing select-none text-xl hidden md:block">
              ⋮⋮
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className={`text-xl font-bold text-gray-900 wrap-break-word 
              ${task.completed ? "line-through text-gray-400" : ""}`}>
              {task.title}
            </h3>
            {task.description && (
            <p className="text-sm text-gray-500 wrap-break-word">
              {task.description}</p>
              )}
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <span className={`px-3 py-1 rounded-full font-medium text-xs border ${
              task.priority === "high priority" ? "bg-red-50 text-red-700 border-red-200" :
              task.priority === "medium priority" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                "bg-green-50 text-green-700 border-green-200"
              }`}>
                {task.priority}
            </span>
            <button 
              onClick={() => toggleComplete(task.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
                        task.completed 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                              : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
              }`}
            >
            {task.completed ? "Completed" : "Incomplete"}
            </button>
            <button 
              className="px-3 py-1.5 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 hover:bg-blue-200 text-xs font-semibold transition-colors"
                onClick={() => startEditTask(task)}
            >
            Edit
            </button>
            <div className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 text-xs font-semibold transition-colors">
              <DeleteTask id={task.id} onDelete={deleteTask} />
            </div>
          </div>
        </>
          )}
          </div>
          )}
          </Draggable>
          ))
        )}
          {provided.placeholder}
        </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  </div>
  );
}
 
export default AddTask;
 