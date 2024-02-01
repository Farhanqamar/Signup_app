import React, { useEffect, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './Contextprovider/context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function Dashboard() {
  const [data, setData] = useState();

  const {loginData, setLoginData} = useContext(LoginContext);
  const navigate = useNavigate();

  const dashBoardVaild = async () => {
    const token = localStorage.getItem("userdatatoken");
    
    try {
        const res = await fetch("http://localhost:8004/validuser", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });      
      const data = await res.json();

      if (data.status == 401 || !data){
        navigate('*')
      }else{
        console.log("user verufy");
        setLoginData(data)
        navigate('/dashboard')
      }

    } catch (error) {
        console.log(error);
    }
}
useEffect(()=>{
  setTimeout(() => {
  dashBoardVaild()
    setData(true)
  },1000);
},[])


  return (

    <>
    {
      data ? <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <img src="./Background.png" style={{width:"250px", marginTop:20}} alt="" />
      <h1>User Email: {loginData ? loginData.ValiduserOne.email : ""}</h1>
     </div>:<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height:"100vh" }}>
          Loading... &nbsp;
      <CircularProgress />
    </Box>
    }
    </>

    
  )
}

export default Dashboard;