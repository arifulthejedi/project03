import React from "react";
import { useContext,useEffect} from "react";
import MyContext from "./context";


import logo from "./assets/logo.png";
import admin from "./assets/login.png";
import ham from "./assets/ham.svg";
import Modal from "./modal";

export default function Header(props){

  let {States,setState} = useContext(MyContext);


//set isLogin
let openLogin = ()=>{
  setState({...States,loginModal:true});
}

//set booking
let openBooking = ()=>{
  setState({...States,booking:true})
}

//set mNav
let openNav = ()=>{
  setState({...States,mNav:true})
}

//open sign up or ad user
let signUp = ()=>{
  setState({...States,signUp:true})
}


//open add dish
let openAddDish = ()=>{
  setState({...States,addDish:true})
}

//logout
let logOut = ()=>{
  localStorage.removeItem('name');
  localStorage.removeItem('pass');
  setState({...States,isLogin:false});
}





    return <>
        <div id="header">
          <div className="logo">
            <a href="home">
            <img style={{marginTop:"3px"}} src={logo} alt="site-logo" height={"60px"} width={"60px"} />
            </a>
          </div>
          <div onClick={openNav} className="mMenu">
            <img style={{marginTop:"3px"}} src={ham} alt="hamburger-nav" height={"40px"} width={"40px"} />
          </div>
          <div className="nav-bar">
            <a href="home">Home</a>
            <a href="about">About Us</a>
            <a href="menu">Our Menu</a>
            <a href="find-us">Find Us</a>
          </div>       
          <div className="btns">
            {States.isLogin ?
              <div className="admins">
              <button onClick={logOut} id="log-out">Log Out</button>
              <button onClick={signUp}>Add User</button>
              <button onClick={openAddDish}>Add Dish</button>
            </div> :
              <div className="users">
                   <button onClick={openBooking}>Book a Table</button>
                   <div onClick={openLogin} className="login">
                      <img width={"50px"} height={"50px"} src={admin} alt="login" />
                   </div>
              </div> }
          </div>
          {props.children}
        </div>
       </>
}