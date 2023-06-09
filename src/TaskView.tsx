import React from "react";
import {Task,getTask,createTask,updateTask} from "./api";

let DueDate = ({value, onChange}:{value:Date|undefined,onChange:(value:Date|undefined)=>void}) => {// todo finish this component

    console.log(value)
    let date = value ? `${value.getFullYear()}-${(value.getMonth()+1).toString().padStart(2,"0")}-${value.getDate().toString().padStart(2,"0")}` : ""
    let hour= value?.getHours() || 0
    let minute= value?.getMinutes() || 0
    let dateString = `${date}T${hour.toString().padStart(2,"0")}:${minute.toString().padStart(2,"0")}`
    console.log(date)
    if(value){
        console.log("value")
        console.log(date)
    }

    React.useEffect(() => { // send date input updates
        console.log(date)
        let dateValue = new Date(dateString); // Todo remove this
        console.log(dateValue)
        console.log(dateString)
        if (!isNaN(dateValue.valueOf())){
            onChange(dateValue);
        } else {
            onChange(undefined)
        }
        },[dateString,onChange])
    return (
        <div className="DueDate">
            <input type="date" value={date} onChange={event => date = event.target.value}/>
            <select id="hour" value={hour} onChange={event => hour = parseInt(event.target.value)}>
                {(() => {
                    let options = []
                    for (let i = 0; i <= 23; i++) {
                        options.push(<option value={i}>{i.toString().padStart(2,"0")}</option>)
                    }
                    return options
                })()}
            </select>
            :
            <select id="minute" value={minute} onChange={event => minute = parseInt(event.target.value)}>
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
    if (taskId !== taskData._id) {
        getTask(taskId).then((task) => {
            console.log(task)
            setTask(task)
        })
    }

    const submit = async () => {
        console.log(taskData)
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
            <textarea placeholder="Description" value={taskData.description || ""} onChange={event => setTask({...taskData,description:event.target.value})}/>
            <DueDate value={taskData.dueDate ? new Date(taskData.dueDate) : undefined} onChange={value => {
                if(value) {
                    setTask({...taskData,dueDate:value})
                }
            }}/>
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