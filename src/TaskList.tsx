import React from 'react'
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

let TaskItem = ({task}:{task:Task}) => {
    return (
        <tr>
            <td>
                {task.title}
            </td>
            <td>
                {task.state}
            </td>
        </tr>
    )
}

let TaskList = ({tasks}:{tasks:[Task]}) => {
    return (
        <table>
            <Header/>
            <tbody>
            {
                tasks.map((task) => {
                    return (<TaskItem task={task} key={task._id}/>)
                })
            }
            </tbody>
        </table>
    )
}

export {
    TaskList
}