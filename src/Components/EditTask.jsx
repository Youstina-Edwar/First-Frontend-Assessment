import { useState } from "react";
import useTasks from "../Hooks/useTasks";
 
function EditTask() {
  const {
    editId,
    setEditId,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    editPriority,
    setEditPriority,
    updateTask,
  } = useTasks();
 
  const [editError, setEditError] = useState("");
 
  const handleValidation = () => {
    if (editTitle.trim() === "") {
      setEditError("Please enter a valid title for the task.");
      return;
    }

    setEditError("");
    updateTask(editId, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    });
    setEditId(null)
  }
 
  return (
    <div className="flex flex-col gap-2 w-full p-2 bg-gray-50 rounded-2xl">
      <input
        type="text"
        value={editTitle}
        onChange={(e) => {
          setEditTitle(e.target.value);
          if (e.target.value.trim()) setEditError("");
        }}
        className="text-xl p-2 border border-gray-300 bg-white rounded-xl font-semibold outline-none focus:ring-2 focus:ring-teal-600"
        placeholder="Edit title"
      />
      {editError && <p className="text-red-500 text-xs font-medium">{editError}</p>}
      <input
        type="text"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        className="text-base text-gray-600 p-2 border border-gray-300 bg-white rounded-xl outline-none focus:ring-2 focus:ring-teal-600"
        placeholder="Edit description"
      />
      <select
        value={editPriority}
        onChange={(e) => setEditPriority(e.target.value)}
        className="p-2 border border-gray-300 bg-white rounded-xl outline-none text-sm focus:ring-2 focus:ring-teal-600"
      >
        <option value="low priority">Low</option>
        <option value="medium priority">Medium</option>
        <option value="high priority">High</option>
      </select>

      <div className="flex gap-2">
        <button
          onClick={handleValidation}
          className="px-4 py-2 mt-1 rounded-xl bg-teal-700 text-white hover:bg-teal-600 font-medium transition-colors flex-1"
        >
          Save Changes
        </button>
        <button
          onClick={() => setEditId(null)}
          className="px-4 py-2 mt-1 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400 font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
 
export default EditTask;
 