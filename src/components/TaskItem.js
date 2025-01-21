import React from "react";

const TaskItem = ({content, handleRemove, handleToggle, handleUpdate, handleTimer})=>{
    
    return (
       <div>
         <p id={content.id}>{content.value}</p>
         {content.update===false?<button className="bg-purple-700 text-white px-2 py-1 my-2" onClick={()=>{handleUpdate(content.id)}}>Update</button>:<button className="bg-green-900 text-white px-2 py-1 my-2" onClick={()=>{handleUpdate(content.id)}}>Done?</button>}
         <button className="bg-red-500 text-white px-2 py-1 my-2" onClick={()=>{handleRemove(content.id)}}>Remove Task</button>
         {content.stat===false?<button className="bg-black text-white px-2 py-1 my-2" onClick={()=>{handleToggle(content.id)}}>Pending</button>:<button className="bg-green-500 text-white px-2 py-1 my-2" onClick={()=>{handleToggle(content.id)}}>Completed</button>}
         <hr></hr>
         <input type="date" id="timer"></input>
         <button className="bg-blue-600 text-white px-2 py-1 my-2 ml-5" onClick={()=>{handleTimer(content.id)}}>Add Timer</button>
       </div>
    );
}

export default TaskItem;