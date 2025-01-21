import React,{useEffect, useState} from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import InputBox from "./components/InputBox";
import LoginPage from "./components/LoginPage";
import Download from "./components/Download";

const App = ()=>{

  const [items,setItems] = useState([]);
  const [oldItems,setOldItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const[user,setUser] = useState(null);

  const handleTimer = (id)=>{
      const time = document.getElementById('timer').value;
      console.log(time);
  }

  const handleRemove = async(id)=>{
    try{
      await axios.delete(`http://localhost:5000/tasks/deletetask/${id}`,
        {
          headers : {
          "Authorization" : 'Bearer ' + localStorage.getItem('token')
        }
      }
      );
      fetchItems();
  
    }catch(err){
      alert(err.response.data.message);
    }
  }
  
  const handleToggle = async(id)=>{
    try{
      await axios.patch(`http://localhost:5000/tasks/updatetasksTodo/${id}`,{},
        {
          headers: {
              'Authorization' : 'Bearer ' + localStorage.getItem('token')
          }
      }
      );
      fetchItems();
    }catch(err){
      alert(err.response.data.message);
    }
  }

  const handleUpdate = async(id)=>{
    let element = document.getElementById(id).tagName.toLowerCase();
    if(element==="p"){
        let p = document.getElementById(id);
        let input = document.createElement("input");
        input.value = p.innerText;
        input.type = "text";
        input.style.border = "1px solid black";
        input.id = p.id;
        p.parentNode.replaceChild(input,p);
    }
    else{
        let input = document.getElementById(id);
        let p = document.createElement("p");
        p.id = input.id;
        p.innerText = input.value;
        input.parentNode.replaceChild(p,input);
        try{
          await axios.patch(`http://localhost:5000/tasks/updatetasksText/${id}`,{
              'text' : input.value
          },
            {
              headers: {
                  'Authorization' : 'Bearer ' + localStorage.getItem('token')
              }
          }
          );
          fetchItems();
        }catch(err){
          alert(err.response.data.message);
        }
    }
    setItems((items)=>items.map(item=>item.id===id?{...item,update:!item.update}:item));
    setOldItems((items)=>items.map(item=>item.id===id?{...item,update:!item.update}:item));
  }

  const fetchItems = async()=>{
    try{
      const response = await axios.get('http://localhost:5000/tasks/gettasks',
        {
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('token')
        }
        }
      );
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

  const getUser = async()=>{
      try{
          const response = await axios.get('http://localhost:5000/users/getUser', {
              headers: {
                  'Authorization' : 'Bearer ' + localStorage.getItem('token')
              }
              }
          );
          setUser(response.data.result);
      }catch(err){
          alert(err.response.data.message);
      }
  }

  useEffect(()=>{
    if(isLoggedIn){
      fetchItems();
      getUser();
    }
      
  },[isLoggedIn]);

  useEffect(()=>{
    localStorage.removeItem('token');
  },[])

  return (isLoggedIn)?(
    <>
      <InputBox setItems={setItems} setOldItems={setOldItems} fetchItems={fetchItems}/>
      <TaskList items={items} handleRemove={handleRemove} handleToggle={handleToggle} handleUpdate={handleUpdate} handleTimer={handleTimer}/>
      <Download items={items} user={user}/>
    </>
  ):(<LoginPage setIsLoggedIn={setIsLoggedIn} isRegister={isRegister} setIsRegister={setIsRegister}/>);
}

export default App;