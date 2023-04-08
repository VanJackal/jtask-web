import React from "react";

let TaskView = () => {
    return (
        <>
            <input placeholder="Task Name"/>
            <textarea placeholder="Description"/>
            <input type="datetime-local"/>
            <input type="text" placeholder="Tags"/>
            <label>Alert </label>
            <input type="checkbox"/>
        </>
    )
}

export {
    TaskView
}