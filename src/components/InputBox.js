import React from "react";
import axios from "axios";

const InputBox = ({setItems, setOldItems, fetchItems}) =>{

    const handleSubmit = async()=>{
        try{
            let value = document.getElementById('task').value;
            await axios.post('https://todo-2-v9sp.onrender.com/tasks/addtask',{
                'text' : value
            },{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            });
            fetchItems();
        }catch(err){
            alert(err.response.data.message);
        }
        document.getElementById('task').value = "";
    }

    const handleSearch = async()=>{
        try{
            let value = document.getElementById('task').value.trim();
            const response = await axios.post('https://todo-2-v9sp.onrender.com/tasks/searchtasks',{
                'searchText' : value
            },{
                headers : {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            });
            const arr = [];
            for (let index = 0; index < response.data.result.length; index++) {
                let task = {id : response.data.result[index]._id, value : response.data.result[index].text, stat:response.data.result[index].todo, update:false};
                arr.push(task);
            }
            setItems(arr);
            setOldItems(arr);
        }catch(err){
            alert(err.response.data.message);
        }
    }

    const handleRetrieve = ()=>{
        let value = document.getElementById('task').value.trim();
        if(value.length===0)fetchItems();
    }
    
    return (
        <div className="flex justify-center items-center mt-10">
            <input type="text" id="task" className="px-2 py-1 my-2 flex border-2 border-solid border-black" onChange={handleRetrieve}></input>
            <button className="bg-blue-800 text-white px-2 py-1" onClick={handleSubmit}>Add Task</button>
            <button className="bg-gray-600 text-white px-2 py-1" onClick={handleSearch}>Search</button>
        </div>
    )
}

export default InputBox;
