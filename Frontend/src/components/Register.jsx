import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Register() {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [startVal, setStartVal] = useState({
    fname:"",
    email:"",
    password:"",
    cpassword:""
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

  const addUserData = async (e)=>{
    e.preventDefault();

    const {fname, email, password, cpassword} = startVal;

    if (fname === "") {
      alert("Please Enter Your Name");
    } else if (email === "") {
      alert("Please Enter Your Email");
    } else if (!email.includes("@g")) {
      alert("Please Enter Valid Email");
    } else if (password === "") {
      alert("Please Enter Your password");
    } else if (password.length < 6) {
      alert("password Must be 6 Char");
    } else if (cpassword === "") {
      alert("Enter Your Confirm password");
    } else if (cpassword.length < 6) {
      alert("password Must be 6 Char");
    } else if (password !== cpassword) {
      alert("password and Confirm password not match");
    } else {      
      const data = await fetch('http://localhost:8004/register',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        fname, email, password, cpassword
      })
    })
    const res = await data.json();
    // console.log(res.status);
    if (res.status === 201){
      alert(`user registration done`);
      setStartVal({...startVal,fname:"",email:"",password:"",cpassword:""})
    }
    }
  }
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{textAlign:"center"}}>we are glad that you will be using project cloud to manage your tasks! <br /> we hope that you will get like it.</p>
          </div>

          <form>
          <div className="form_input">
              <label htmlFor="email">Name</label>
              <input type="text" name='fname' onChange={getVal} value={startVal.fname} id='name' placeholder='Enter Your Name' />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input type="email" name='email' onChange={getVal} id='email' value={startVal.email}  placeholder='Enter Your Eamil' />
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

            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
              <input type={!cpassShow ? "password" : "text"} onChange={getVal} value={startVal.cpassword} name='cpassword' id='cpassword' placeholder='Confirm Password' />

              <div className="showpass" onClick={()=> setCPassShow(!cpassShow)}>
                {!cpassShow ? "Show" : "Hide"}
              </div>
              </div>
            </div>

            <button className='btn' onClick={addUserData}>Sign Up</button>
            <p>If you have an Account? <NavLink to={'/'}>Login</NavLink></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register
