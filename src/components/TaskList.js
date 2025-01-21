import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({items, handleRemove, handleToggle, handleUpdate, handleTimer}) =>{
    return (
        <div className="flex justify-center items-center ">
            <ul>
            {   
                items.map((element) =>
                    <li key={element.id}><TaskItem content={element} handleRemove={handleRemove} handleToggle={handleToggle} handleUpdate={handleUpdate} handleTimer={handleTimer}/></li>
                )
            }
            </ul>
        </div>
    )
}

export default TaskList;