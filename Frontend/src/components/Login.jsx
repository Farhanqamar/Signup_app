import React, { useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import './CSS/Mix.css'


function Login() {
  const [passShow, setPassShow] = useState(false);

  const navigate = useNavigate();

  const [startVal, setStartVal] = useState({    
    email:"",
    password:""
  })

  console.log(startVal);

  const getVal = (e)=>{
    const {name, value} = e.target;
    setStartVal(()=>{
      return{
        ...startVal,
        [name]:value  // this part loginc not clear
      }
    })
  }

  const loginUser = async (e)=>{
    e.preventDefault();

    const {email, password} = startVal;

    if (email === "") {
      alert("Please Enter Your Email");
    } else if (!email.includes("@g")) {
      alert("Please Enter Valid Email");
    } else if (password === "") {
      alert("Please Enter Your password");
    } else if (password.length < 6) {
      alert("password Must be 6 Char");
    } else {
      const data = await fetch('http://localhost:8004/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email, password
      })
    })
    const res = await data.json();

    if (res.status === 201){
      localStorage.setItem("userdatatoken", res.result.token)
      navigate('/dashboard')
      setStartVal({...startVal,email:"",password:""})
    }
    }    
  }

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, you are can login now</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name='email' onChange={getVal} value={startVal.email} id='email' placeholder='Enter Your Eamil' />
            </div>

            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
              <input type={!passShow ? "password" : "text"} onChange={getVal} value={startVal.password} name='password' id='password' placeholder='Enter Your password' />
              <div className="showpass" onClick={()=> setPassShow(!passShow)}>
                {!passShow ? "Show" : "Hide"}
              </div>
              </div>
            </div>

            <button className='btn' onClick={loginUser}>Login</button>
            <p>Don't have an Account? <NavLink to={'/register'}>Sign Up</NavLink></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login
