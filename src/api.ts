enum State {
    Complete,
    Incomplete,
    Dropped
}
interface Task {
    _id:string,
    title:string,
    description?:string,
    dueDate?:Date,
    state:State,
    tags?:Array<string>,
    alerts?:Array<string>,
    parent?:string // mongo id
}

let _host = ""

/**
 * set the host for all JTask api calls
 * @param host
 */
function setHost(host:string):void {
    _host = host
    console.debug("set API host to:",host)
}

async function getTaskList():Promise<[Task]>{
    const res = await fetch(_host + "/tasks",{method:"GET",mode:"cors"})
    return res.json()
}

async function createTask(task:Partial<Task>):Promise<Task>{
    const res = await fetch(_host + "/task", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(task)
    })
    return res.json()
}

async function getTask(taskId:string):Promise<Task>{
    const res = await fetch(_host + "/tasks/" + taskId, {method:"GET"})
    return res.json()
}

async function updateTask(taskId:string,task:Partial<Task>):Promise<Task> {
    const res = await fetch(_host + "/tasks/" + taskId, {
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(task)
    })
    return res.json()
}

async function deleteTask(taskId:string):Promise<Task>{
    const res = await fetch(_host + "/tasks/" + taskId, {method:"DELETE"})
    return res.json()
}


export {
    setHost,
    getTaskList,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    State
}
export type {
    Task
}