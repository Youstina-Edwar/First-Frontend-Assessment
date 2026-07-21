import { useState } from "react";

function DeleteTask({ id, onDelete }) {

  const [alertMessage , setAlertMessage] = useState(false)

  const handleDelete = () => {
      onDelete(id)
      setAlertMessage(false)
    }

  return (
    <>
    <button onClick={() => setAlertMessage(true)}
    className="text-red-600 hover:text-red-800 font-semibold transition-colors">
      Delete
    </button>
    { alertMessage && (
      <div className="fixed inset-0 z-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
          <h3>Delete task</h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete this task?
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setAlertMessage(false)}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors">
                Delete
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default DeleteTask;