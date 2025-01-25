import React from "react";
import axios from "axios";

const LoginPage = ({setIsLoggedIn, setIsRegister, isRegister}) =>{
    const handleChange = ()=>{
        setIsRegister(true);
    }
    const handleLogin = async()=>{
        let email = document.getElementById('email').value;
        let pass = document.getElementById('pass').value;
        try{
            const response = await axios.post('https://todo-2-v9sp.onrender.com/users/login',
                {
                    email : email,
                    password : pass
                });
            localStorage.setItem('token',response.data.result.token);
            setIsLoggedIn(true);
        }catch(err){
            alert(err.response.data.message);
        }
    }
    const handleRegister = async()=>{
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let pass = document.getElementById('pass').value;
        try{
            const response = await axios.post('https://todo-2-v9sp.onrender.com/users/register',
                {
                    name : name,
                    email : email,
                    password : pass
                });
            localStorage.setItem('token',response.data.result.token);
            setIsLoggedIn(true);
        }catch(err){
            alert(err.response.data.message);
        }
    }
    return (
        <div>
            {isRegister?(<div className="flex justify-center items-center mt-10">
                <input type="text" id="name" placeholder="Enter your name"></input>
            </div>):<div></div>}
            <div className="flex justify-center items-center mt-10">
                <input type="email" id="email" placeholder="Enter your email"></input>
            </div>
            <div className="flex justify-center items-center mt-10">
                <input type="password" id="pass" placeholder="Enter your password"></input>
            </div>
            <div className="flex justify-center items-center mt-10">
            {isRegister?(
            <button onClick={handleRegister} className="border-2 border-solid border-black bg-slate-200 px-2">Register</button>
        ):(
        <>
        <button onClick={handleLogin} className="border-2 border-solid border-black bg-slate-200 mx-5 px-4">Login</button>
        <button onClick={handleChange} className="border-2 border-solid border-black bg-slate-200 px-2">New User? Register</button>
        </>)}
            </div>
        </div>
    )
}

export default LoginPage;
