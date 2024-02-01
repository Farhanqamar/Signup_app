import React, { useContext } from "react";
import "./CSS/Header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./Contextprovider/context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

function Header() {
  const { loginData, setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const suerLogout = async ()=> {
    const token = localStorage.getItem("userdatatoken");
    
    try {
        const res = await fetch("http://localhost:8004/logout", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token,
              Accept: "application/json"
          },
          credentials:"include"
      });      
      const data = await res.json();
      console.log(data);
      if (data.status == 201){
        console.log("user logout");
    const token = localStorage.removeItem("userdatatoken");
        setLoginData(false)
        navigate('/')
      }else{
        console.log("user logout");
      }

    } catch (error) {
        console.log(error);
    }
  }

  const goDash = () => {
    navigate("/dashboard");
  };

  const goError = () => {
    navigate("*");
  };

  return (
    <header>
      <nav>
        <h1>HP Cloud</h1>
        <div className="Avtar">
          {loginData.ValiduserOne ? (
            <Avatar
              style={{ backgroundColor: "#ce6f6f" }}
              onClick={handleClick}
            >
              {loginData.ValiduserOne.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar style={{ backgroundColor: "red" }} onClick={handleClick} />
          )}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {loginData.ValiduserOne ? (
            [
              <MenuItem key="profile" onClick={() => {
                goDash()
                handleClose()
                }}>
                Profile
              </MenuItem>,
              <MenuItem key="logout" onClick={() => {
                suerLogout()
                handleClose()
                }}>
                Logout
              </MenuItem>,
            ]
          ) : (
            <MenuItem
              key="profile-error"
              onClick={() => {
                goError();
                handleClose();
              }}
            >
              Profile
            </MenuItem>
          )}
        </Menu>
      </nav>
    </header>
  );
}

export default Header;
