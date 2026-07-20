import useLocalStorage from "./LocalStorage";

function useTasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updatedFields }
          : task
      )
    );
  };

  const reorderTasks = (newTasks) => {
    setTasks(newTasks);
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleComplete,
    updateTask,
    reorderTasks,
    setTasks,
  };
}

export default useTasks;