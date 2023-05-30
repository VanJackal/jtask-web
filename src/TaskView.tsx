import React from "react";
import {Task,getTask,createTask,updateTask} from "./api";

let DueDate = ({value, onChange}:{value:Date|null,onChange:(value:Date)=>void}) => {// todo finish this component
    let date:Date|null = value? new Date(value.getDate()) : null;
    let hour:number = value?.getMinutes() || 0;
    let minute:number = value?.getHours() || 0;

    const sendChange = () => {

    }
    return (
        <div className="DueDate">
            <input type="date" value={date?.toISOString()}/>
            <select id="hour" value={hour}>
                {(() => {
                    let options = []
                    for (let i = 0; i <= 23; i++) {
                        options.push(<option value={i}>{i.toString().padStart(2,"0")}</option>)
                    }
                    return options
                })()}
            </select>
            :
            <select id="minute" value={minute}>
                {(() => {
                    let options = []
                    for (let i = 0; i <= 55; i+=5) {
                        options.push(<option value={i}>{i.toString().padStart(2,"0")}</option>)
                    }
                    return options
                })()}
            </select>
        </div>
    )
}

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
            <DueDate value={taskData.dueDate?new Date(taskData.dueDate):null} onChange={value => setTask({...taskData,dueDate:value.toISOString()})}/>
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