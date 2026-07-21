import useTasks from "../Hooks/useTasks";

function SearchBar() {

  const { searchTask, setSearchTask } = useTasks();
 
  return (
    <div className="max-w-4xl mx-auto px-4 mt-6">
      <div className="max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a task by title.."
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
            className="w-full pl-4 py-2.5 pr-10 bg-white border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-teal-600 text-sm transition-shadow shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
 
export default SearchBar;
 