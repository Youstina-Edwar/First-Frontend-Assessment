import { useState } from "react";
function EditTask({
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  editPriority,
  setEditPriority,
  onSave
}) {
    const[editError, setEditError] = useState("");

    const handleValidation = () => {
        if (editTitle.trim() === "") {
            setEditError("Please enter a valid title for the task.");
            return;
        }
        setEditError("");
        onSave();
    }

  return (
    <div className="flex flex-col gap-2 w-full p-2 bg-gray-50 rounded-2xl">
        <input
            type="text"
            value={editTitle}
            onChange={(e) => {setEditTitle(e.target.value)
                if (e.target.value.trim()) setEditError("")
                }
            }
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
            className="p-2 border border-gray-300 bg-white rounded-xl outline-none text-sm focus:ring-2 focus:ring-teal-600 "
        >
            <option value="low priority" className="text-green-700 text-lg">Low</option>
            <option value="medium priority " className="text-yellow-600 text-lg">Medium</option>
            <option value="high priority" className="text-red-600 text-lg">High</option>
        </select>

        <button 
            onClick={handleValidation} 
            className="px-4 py-2 mt-1 rounded-xl bg-teal-700 text-white hover:bg-teal-600 font-medium transition-colors"
        >
        Save Changes
        </button>
    </div>
  );
}
 
export default EditTask;
 