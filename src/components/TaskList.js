import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({items, handleRemove, handleToggle, handleUpdate}) =>{
    return (
        <div className="flex justify-center items-center ">
            <ul>
            {   
                items.map((element,index) =>
                    <li key={index}><TaskItem content={element} handleRemove={handleRemove} handleToggle={handleToggle} handleUpdate={handleUpdate}/></li>
                )
            }
            </ul>
        </div>
    )
}

export default TaskList;