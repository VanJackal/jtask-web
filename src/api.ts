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
    alerts?:Array<Date>,
    parent?:string // mongo id
}

let _host = ""

/**
 * set the host for all JTask api calls
 * @param host
 */
function setHost(host:string):void {
    _host = host
}

function isTask(obj:any):obj is Task{ // todo could this be changed to just check if the obj has only the required values
    return (
        typeof obj._id === "string"
        && typeof obj.title === "string"
        && Object.values(State).includes(obj.state) // check task.state is a valid state
        && (typeof obj.description === "undefined" || typeof obj.description === "string")
        && (typeof obj.dueDate === "undefined" || obj.dueDate instanceof Date)
        && (typeof obj.tags === "undefined" || (obj.tags instanceof Array
            && obj.tags.every( (tag:any) => {
                return typeof tag === "string"
            })))
        && (typeof obj.alerts === "undefined" || (obj.alerts instanceof Array
            && obj.alerts.every((alert:any) => {
                return alert instanceof Date
            })))
        && (typeof obj.parent === "undefined" || typeof obj.parent === "string")
    )
}

function isTaskArr(obj:Array<any>):obj is [Task]{
    return obj.every((item) => {
        return isTask(item)
    })
}

async function getTaskList():Promise<[Task]>{
    const res = await fetch(_host + "/tasks",{method:"GET",mode:"cors"})
    const body = await res.json()
    if (isTaskArr(body)){
        return body
    } else {
        throw new Error("API responded with invalid Tasks array")
    }
}

async function createTask(task:Partial<Task>):Promise<Task>{
    const res = await fetch(_host + "/task", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(task)
    })
    return res.json()
}


export {
    setHost,
    getTaskList,
    State
}
export type {
    Task
}

//TODO fully implement this
//TODO implement this without an object (use a global var or envvar to store API URI)
//TODO remove type verification (return correct types but suppress ts)