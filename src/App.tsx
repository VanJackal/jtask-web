import React from 'react';
import './App.css';
import * as JTask from './api'
import {Task} from "./api";
import {TaskList} from "./TaskList"

JTask.setHost(process.env.REACT_APP_API||"")

function App() {
  const [tasks, setTasks] = React.useState<[Task]|null>(null)
  React.useEffect(() => {
      let updateTasks = async () => {
          setTasks(await JTask.getTaskList())
      }
      updateTasks();
  })
  JTask.getTaskList().then((res) => {
      console.log(res)
  })
  return (
    <div className="App">
        {tasks?<TaskList tasks={tasks}/>:<p>loading</p>}
    </div>
  );
}

export default App;
