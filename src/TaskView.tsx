import React from "react";
import {Task,getTask,createTask,updateTask} from "./api";

let TaskView = ({taskId,select,refresh}:{taskId:string,select:Function,refresh:Function}) => {
    let [taskData, setTask] = React.useState<Task>({
        _id: "", state: 0, title: ""
    })
    if (taskId != taskData._id) {
        getTask(taskId).then((task) => {
            setTask(task)
        })
    }

    const submit = async () => {
        if (taskId){// update
            await updateTask(taskId,taskData)
        } else {// create
            const created = await createTask(taskData)
            select(created._id)
            setTask({...taskData,_id:created._id})
        }
        refresh()
    }
    return (
        <>
            <input placeholder="Task Name" value={taskData.title} onChange={ event => setTask({...taskData,title:event.target.value})}/>
            <textarea placeholder="Description" value={taskData.description} onChange={event => setTask({...taskData,description:event.target.value})}/>
            <input type="datetime-local" value={taskData.dueDate?new Date(taskData.dueDate).toLocaleString():""} onChange={event => setTask({...taskData,dueDate:new Date(event.target.value).toISOString()})}/>
            <input type="text" placeholder="Tags" value={taskData.tags} onChange={event => setTask({...taskData,tags:event.target.value.split(",")})}/>
            <label>Alert </label>
            <input type="checkbox"/>
            <button onClick={submit}>Save</button>
        </>
    )
}

export {
    TaskView
}