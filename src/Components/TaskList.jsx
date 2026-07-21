import { useState } from "react";
import useTasks from "../Hooks/useTasks";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
 
function TaskList() {

  const {
    tasks,
    searchTask,
    editId,
    startEditTask,
    toggleComplete,
    deleteTask,
    reorderTasks
  } = useTasks();
 
  const [filter, setFilter] = useState("All");
 
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter === "All" ? true :
      filter === "Active" ? !task.completed :
      task.completed;

    const searchMatch = task.title.toLowerCase().includes(searchTask.toLowerCase());
    return statusMatch && searchMatch;
  });
 
  const handleOnDrag = (result) => {
    if (!result.destination) return;

    const reordered = [...filteredTasks];

    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    reorderTasks([
      ...reordered,
      ...tasks.filter(
        task => !filteredTasks.some((ft) => ft.id === task.id))
    ])
  }
 
  return (
    <div className="max-w-4xl mx-auto px-4 mt-12 pb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Task Items</h2>
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-sm w-max mb-6">
          {["All", "Active", "Completed"].map((status) => (
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
      <DragDropContext onDragEnd={handleOnDrag}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12 px-4 bg-white border border-dashed border-gray-300 rounded-2xl">
                  <p className="text-base font-semibold text-gray-500">
                    {tasks.length === 0 ? "Your task list is empty" : searchTask ? `No task matches ${searchTask}` : `No ${filter.toLowerCase()} tasks found`}
                  </p>
                </div>
              ) : (
                filteredTasks.map((task, index) => (
                  <Draggable key={String(task.id)} draggableId={String(task.id)} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-white border border-gray-200 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-shadow ${
                          task.completed ? "bg-gray-50 opacity-75" : ""
                        } ${snapshot.isDragging ? "shadow-2xl border-teal-500 scale-[1.01] bg-teal-50/10" : "hover:shadow-md"}`}
                      >
                        {editId === task.id ? (
                        <EditTask />
                        ) : (
                      <>
                        <div
                          {...provided.dragHandleProps}
                          className="text-gray-400 cursor-grab active:cursor-grabbing select-none text-xl hidden md:block"
                        >
                          ⋮⋮
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <h3 className={`text-xl font-bold text-gray-900 ${task.completed ? "line-through text-gray-400" : ""}`}>
                            {task.title}
                          </h3>
                          {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
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
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm ${
                            task.completed ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-purple-50 text-purple-700 border-purple-200"
                            }`}
                          >
                           {task.completed ? "Completed" : "Incomplete"}
                          </button>
                          <button
                            className="px-3 py-1.5 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 hover:bg-blue-200 text-xs font-semibold"
                            onClick={() => startEditTask(task)}
                          >
                            Edit
                          </button>
                          <div className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-100">
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
  );
}
 
export default TaskList;
 