import { createContext, useContext, useState } from "react";
import useLocalStorage from "./LocalStorage";
 
const TaskContext = createContext();

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const [searchTask, setSearchTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("medium priority");
 
  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };
 
  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id))
  }
 
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }
 
  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };
 
  const reorderTasks = (newTasks) => {
    setTasks(newTasks);
  };
 
  const startEditTask = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
  };
 
  return (
    <TaskContext.Provider
      value={{
        tasks,
        searchTask,
        setSearchTask,
        editId,
        setEditId,
        editTitle,
        setEditTitle,
        editDescription,
        setEditDescription,
        editPriority,
        setEditPriority,
        addTask,
        deleteTask,
        toggleComplete,
        updateTask,
        reorderTasks,
        startEditTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
 
export default function useTasks() {
  return useContext(TaskContext);
}
 