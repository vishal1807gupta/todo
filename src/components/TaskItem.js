import React from "react";

const TaskItem = ({content, handleRemove, handleToggle, handleUpdate})=>{
    
    return (
       <div>
         <p id={content.id}>{content.value}</p>
         {content.update===false?<button className="bg-purple-700 text-white px-2 py-1 my-2" onClick={()=>{handleUpdate(content.id)}}>Update</button>:<button className="bg-green-900 text-white px-2 py-1 my-2" onClick={()=>{handleUpdate(content.id)}}>Done?</button>}
         <button className="bg-red-500 text-white px-2 py-1 my-2" onClick={()=>{handleRemove(content.id)}}>Remove Task</button>
         {content.stat===false?<button className="bg-black text-white px-2 py-1 my-2" onClick={()=>{handleToggle(content.id)}}>Todo</button>:<button className="bg-green-500 text-white px-2 py-1 my-2" onClick={()=>{handleToggle(content.id)}}>Completed</button>}
       </div>
    );
}

export default TaskItem;