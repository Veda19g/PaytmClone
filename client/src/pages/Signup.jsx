import { useState } from "react";
import { signup } from "../../actions/actions";
import { useNavigate } from "react-router-dom";
export function Signup(){
    const navigate=useNavigate();
    const [formData,setFormData]=useState({username:"",firstName:"",lastName:"",password:""});
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(formData);
        const response=await signup(formData);
        console.log("signup response",response);
        if(response.status){
            if (response.user) {
                const userCopy = response.user;
                delete userCopy.password;
                localStorage.setItem('user', JSON.stringify(userCopy))
            }
            navigate('/dashboard');
            return 
        }  
        alert('not allowed for you :/ (jk, plz try again later), have a great day :)');
        
        return;
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});    
    }

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">Signup</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block font-medium text-black">Username</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="firstName" className="block font-medium text-black">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your First Name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block font-medium text-black">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your Last Name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-medium text-black">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-black focus:border-black sm:text-sm"
                        />
                    </div>
                    <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">Signup</button>
                </form>
            </div>
        </div>
    );
    
    };