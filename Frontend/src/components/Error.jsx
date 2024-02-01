import React from 'react';
import { NavLink } from 'react-router-dom';

function Error() {

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <img src="/404.svg" style={{width:"400px", marginTop:"40px"}} alt="" />
      <h1>PAGE NOT FOUND</h1>
      <NavLink to={'/'}><h3>Back To Hoem Page</h3></NavLink>
    </div>
  )
}

export default Error
