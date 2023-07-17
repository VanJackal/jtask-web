import React from "react";
import {Task,getTask,createTask,updateTask} from "./api";

const NULL_TASK = {_id: "", state: 0, title: ""}

let padNum = (len:number,num:number) => {
    return num.toString().padStart(len,"0")
}
let getDateString = (date:Date) => {
    return `${date.getFullYear()}-${padNum(2, date.getMonth()+1)}-${padNum(2,date.getDate())}`;
}

let getDate = (date:string,hour:number,minute:number):Date => {
    const dateString = `${date}T${padNum(2,hour)}:${padNum(2,minute)}`
    console.log(dateString)
    return new Date(dateString)
}

let DueDate = ({value, onChange}:{value:Date|null,onChange:(value:Date)=>void}) => {// todo finish this component
    let DateData = {
        date : value? getDateString(value) : "",
        hour : value?.getHours() || 0,
        minute : value?.getMinutes() || 0
    }
    console.log(DateData)
    console.log(value)

    const handleChange = (propertyName:string) => ( event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        DateData = {
            ...DateData,
            [propertyName]:event.target.value
        }
        onChange(getDate(DateData.date,DateData.hour,DateData.minute));
    }
    return (
        <div className="DueDate">
            <input type="date" value={DateData.date} onChange={handleChange("date")}/>
            <select id="hour" value={DateData.hour} onChange={handleChange("hour")}>
                {(() => {
                    let options = []
                    for (let i = 0; i <= 23; i++) {
                        options.push(<option value={i}>{i.toString().padStart(2,"0")}</option>)
                    }
                    return options
                })()}
            </select>
            :
            <select id="minute" value={DateData.minute} onChange={handleChange("minute")}>
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
    let [taskData, setTask] = React.useState<Task>(NULL_TASK)
    React.useEffect(() => {
        if (taskId) {
            getTask(taskId).then((task) => {
                setTask(task)
            })
        } else {
            setTask(NULL_TASK)
        }
    },[taskId])

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
            <input placeholder="Task Name" value={taskData.title || ""} onChange={ event => setTask({...taskData,title:event.target.value})}/>
            <textarea placeholder="Description" value={taskData.description || ""} onChange={event => setTask({...taskData,description:event.target.value})}/>
            <DueDate value={taskData.dueDate?new Date(taskData.dueDate):null} onChange={value => setTask({...taskData,dueDate:value})}/>
            <input type="text" placeholder="Tags" value={taskData.tags || ""} onChange={event => setTask({...taskData,tags:event.target.value.split(",")})}/>
            <div>
                <label>Alert </label>
                <input type="checkbox"/>
            </div>
            <button onClick={submit}>Save</button>
        </>
    )
}

export {
    TaskView
}