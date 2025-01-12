import React from "react";
import axios from "axios";

const LoginPage = ({setIsLoggedIn}) =>{
    const handleLogin = async()=>{
        let email = document.getElementById('email').value;
        let pass = document.getElementById('pass').value;
       const response = await axios.post('http://localhost:5000/users/login',
            {
                email : email,
                password : pass
            });
        localStorage.setItem('token',response.data.result.token);
        setIsLoggedIn(true);
    }
    return (
        <div>
            <div className="flex justify-center items-center mt-10">
                <input type="email" id="email" placeholder="Enter your email" className="none"></input>
            </div>
            <div className="flex justify-center items-center mt-10">
                <input type="password" id="pass" placeholder="Enter your password" className="none"></input>
            </div>
            <div className="flex justify-center items-center mt-10">
            <button onClick={handleLogin} className="border-2 border-solid border-black bg-slate-200">Login</button>
            </div>
        </div>
    )
}

export default LoginPage;