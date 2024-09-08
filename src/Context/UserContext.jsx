import {createContext, useState ,useEffect } from "react";
import { jwtDecode } from "jwt-decode";



export  const UserContext=createContext();

export default function UserContextProvider({children}){
  const [userData, setUserData] = useState(() => {return localStorage.getItem('userData')|| null});
  const [userId, setUserId] = useState(()=>{return localStorage.getItem("userId") || null});



      useEffect(()=>{
        if(userData){
            const decodedToken = jwtDecode(userData);
            setUserId(decodedToken.id);
            localStorage.setItem("userId", decodedToken.id);
        }

      },[userData])
    

    function Logout(){
        localStorage.removeItem('userId')
        localStorage.removeItem('userData');
        setUserData(null);
    }

    return <UserContext.Provider value={{userData,setUserData,Logout,userId}}>
                {children}
            </UserContext.Provider>
}