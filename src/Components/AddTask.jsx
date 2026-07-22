import {useState} from "react";

function AddTask({addTask}) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium priority");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const priorityOptions = ["Low priority", "Medium priority", "High priority"];
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Please enter a valid title for the task");
      return;
    }
 
    setError("");
 
    const newTask = {
      id: Date.now().toString(), // Unique ID based on timestamp
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false,
    };
 
    addTask(newTask);
 
    setSuccessMessage("Task added successfully");
    setTimeout(() => {
      setSuccessMessage("")
    }, 2000);

    reset();

  };
  const reset = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium priority");
  }
  const handleTitleChange = (e) => { 
    setTitle(e.target.value);
    if (e.target.value.trim()) setError("");
  }

  const handleDescriptionChange = (e) => setDescription(e.target.value)

  const handlePriorityChange = (e) => setPriority(e.target.value)


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
          onChange={handleTitleChange}
          />
          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
          <textarea
          className="border p-2 w-full border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-shadow text-sm"
          placeholder="Add a description"
          value={description}
          onChange={handleDescriptionChange}
          rows="3"
          />
          <div className="flex flex-wrap gap-3">
            <select
            className="border p-2 border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors text-sm"
            value={priority}
            onChange={handlePriorityChange}
            >
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            </select>
          </div>
          <button type="submit" className="bg-teal-700 text-white p-2.5 w-full rounded-xl hover:bg-teal-600 font-medium transition-colors shadow-sm">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
 
export default AddTask;
 