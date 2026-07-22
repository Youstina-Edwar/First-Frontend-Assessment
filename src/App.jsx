import AddTask from './Components/AddTask';
import SearchBar from './Components/SearchBar';
import TaskList from './Components/TaskList';
import useTasks from './Hooks/useTasks';
 
function App() {
  const taskHook = useTasks()

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
      <AddTask addTask={taskHook.addTask}/>
      <SearchBar searchTask={taskHook.searchTask} setSearchTask={taskHook.setSearchTask}/>
      <TaskList {...taskHook}/>
    </div>
  );
}
 
export default App;
 