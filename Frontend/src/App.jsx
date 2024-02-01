import { useContext, useEffect, useState } from 'react'
import Dashboard from './components/Dashboard'
import Error from './components/Error'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { LoginContext } from './components/Contextprovider/context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
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
      console.log(`app data ${data}`);
      
      if (data.status == 401 || !data){
        console.log("user not vaild");
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
    },2000);
  },[])


  return (
    <>
    {
      data ? (
        <>
      <Header/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
        </>
      ):(
        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height:"100vh" }}>
          Loading... &nbsp;
      <CircularProgress />
    </Box>
      )
    }
      
      
    </>
  )
}

export default App
