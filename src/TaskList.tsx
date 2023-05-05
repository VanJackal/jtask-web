import React, {MouseEventHandler} from 'react'
import {Task} from './api'

let Header = () => {
    return (
        <thead>
        <tr>
            <td>
                Task
            </td>
            <td>
                State
            </td>
        </tr>
        </thead>
    )
}

let TaskItem = ({task,clickFunc,selected}:{task:Task,clickFunc:MouseEventHandler,selected:boolean}) => {
    return (
        <tr onClick={clickFunc} className={selected?"selected":""}>
            <td>
                {task.title}
            </td>
            <td>
                {task.state}
            </td>
        </tr>
    )
}

let TaskList = ({tasks,select,selected}:{tasks:[Task],select:Function,selected:string}) => {
    return (
        <table>
            <Header/>
            <tbody>
            {
                tasks.map((task) => {
                    return (<TaskItem task={task} key={task._id} clickFunc={()=>{select(task._id)}} selected={task._id == selected}/>)
                })
            }
            </tbody>
        </table>
    )
}

export {
    TaskList
}