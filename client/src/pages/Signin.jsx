import { useState } from "react";
import { login } from "../../actions/actions";
import { useNavigate } from "react-router-dom";
export function Signin(){
    const navigate=useNavigate();
    const [formData,setFormData]=useState({username:"",password:""});
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(formData);
        const response=await login(formData);
        console.log("response",response);
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

        return(
            
                 <div>
                    <div>
                        <div>
                            <div>
                              Signup
                            </div>
                            <div>
                               <form onSubmit={handleSubmit}>
                                     <div>
                                          <label>Username</label>
                                          <input
                                          type="text"
                                          name="username"
                                          value={formData.username}
                                          onChange={handleChange}
                                          placeholder="Enter your username"/>
                                     </div>
                                     <div>
                                          <label>Password</label>
                                          <input
                                           type="password"
                                           name="password"
                                           value={formData.password}
                                           onChange={handleChange}
                                           placeholder="Enter your password"/>
                                     </div>
                                     <button type="submit">Signup</button>
                               </form>
                            </div>
                        </div>
                    </div>
                 </div>
        )
    
}