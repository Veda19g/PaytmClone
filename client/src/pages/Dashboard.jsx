import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const  Dashboard=()=>{
    const navigate=useNavigate();
    const [balance,setBalance]=useState(0);
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [users,setUsers]=useState([]);
    useEffect(() => {  
        const fetchData = async () => {              
            try {
                const response = await axios.get("http://localhost:8000/api/v1/user/userDetails",
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.log("response", response);
                const { balance, firstName,lastName } = response.data; // Destructure balance and user from response
                setBalance(balance); // Set balance state
                setFirstName(firstName); 
                setLastName(lastName); // Set user state
            } catch (err) {
                console.log("error in ", err);
            }
        };
        fetchData(); // Call fetchData function
    }, []);


      useEffect(()=>{
          const fetchUsers=async()=>{
              try{
                  const response=await axios.get("http://localhost:8000/api/v1/user/bulk",{
                      withCredentials:true,
                      headers:{
                          "Content-Type":"application/json",
                      },
                  });
                  console.log("response",response);
                  setUsers(response.data.users);
              }
              catch(err){
                  console.log("error in ",err);
              }  
          }
          fetchUsers();
      },[])
    
    
    const handleSend =(user) => {
        try{
         navigate("/send?id=" + user._id + "&name=" + user.firstName);
        } catch (err) {
          console.log("error in ", err);
        }   
    };

    return(
        <div>
             <div>
                Paytm
             </div>
             <div>
                <div>YourAccount</div>
                <div>Hello {firstName} {lastName} Your Balance is {balance}</div>
             </div>
             <div>
             {users.map((user) => (
          <div key={user._id}>
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              <button onClick={()=>handleSend(user)}>Send Money</button>
            </div>
          </div>
          ))}
             </div>
        </div>
    )
    
    
    }
    