import AddTask from "./components/AddTask";
import DashBoard from "./components/DashBoard";
import Intro from "./components/Intro";
import TaskList from "./components/TaskList";

function App() {
  

  return (
    <>
    <div className="w-full min-h-screen  flex flex-col">
      
        <Intro/>
      

        <AddTask/>

        <TaskList/>

        <DashBoard/>
      
      
      
    </div>
      
    </>
  )
}

export default App
