import React from 'react';
import './App.css';
import * as JTask from './api'
import {Task} from "./api";
import {TaskList} from "./TaskList"
import {TaskView} from "./TaskView";

JTask.setHost(process.env.REACT_APP_API || "")

function App() {
	const [tasks, setTasks] = React.useState<[Task] | null>(null)
	const [selected, setSelected] = React.useState<string>("")

	let updateTasks = async () => {
		setTasks(await JTask.getTaskList())
	}
	React.useEffect(() => {//get tasks on first render
		updateTasks();
	},[])

	return (
		<div className="App">
			<div className="TaskList">
				{tasks ? <TaskList tasks={tasks}/> : <p>loading</p>}
			</div>
			<div className="TaskView">
				<TaskView taskId={selected} select={setSelected} refresh={updateTasks}/>
			</div>
		</div>
	);
}

export default App;
