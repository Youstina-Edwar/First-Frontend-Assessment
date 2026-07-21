import AddTask from './Components/AddTask';
import SearchBar from './Components/SearchBar';
import TaskList from './Components/TaskList';
import { TaskProvider } from './Hooks/useTasks';
 
function App() {

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-800">
        <AddTask />
        <SearchBar />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
 
export default App;
 