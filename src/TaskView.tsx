import React from "react";
import {Task} from "./api";

let TaskView = ({taskId}:{taskId:string}) => {
    let [taskData, setTask] = React.useState<Task>({
        _id: "", state: 0, title: ""
    })
    return (
        <>
            <input placeholder="Task Name" value={taskData.title}/>
            <textarea placeholder="Description" value={taskData.description}/>
            <input type="datetime-local"/>
            <input type="text" placeholder="Tags"/>
            <label>Alert </label>
            <input type="checkbox"/>
            <button>Create</button>
        </>
    )
}

export {
    TaskView
}