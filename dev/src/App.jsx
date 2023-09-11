import "./index.css";

import Header from "./header";
import Footer from "./footer.jsx";
import Menu from "./menu";
import Login from "./login-popup";
import Dish from "./dish-popup";
import Modal from "./modal";
import AddUser from "./add-user";
import AddDish from "./add-dish";
import AboutUs from "./aboute-us";
import FindUs from "./find-us";
import Home from "./home";
import MobileNav from "./mobile-nav";
import Booked from "./book-a-table";
import Messages from "./messages-bookings";
import DeleteDish from "./delete-dish";
import Message from "./message-details";



import { useState,useEffect } from "react";
import MyContext from "./context";
import Preloader from "./preloader";
import Delete from "./delete-confirmation";
import Upadate from "./update-dish";


function App() {

  let [States,setState] = useState({
    loginModal:false,
    deleteDish:{open:false},
    updateDish:{open:false,item:{}},
    delete:{open:false,id:null,route:null},
    messageDetail:{open:false,item:[]},
    offset:0,
    isLogin:false,
    mNav:false,
    details:false,
    booking:false,
    update:false,
    signUp:false,
    addDish:false,
    menuItems:{item:[],count:null},
    dish:{open:false,item:{}},
    messages:[],
    booked:[]
  })
  



useEffect(()=>{
  let dom = document.querySelectorAll(".nav-bar a");
  let logobar = document.querySelector(".logo a");


//smoth scrolling
dom.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector("#"+targetId).offsetTop;
    window.scrollTo({
      top: targetSection-100,
      behavior: 'smooth',
    })
  });
});


//smoth scrolling for logo
logobar.addEventListener("click", function(e) {
  e.preventDefault();
  const targetId = this.getAttribute("href");
  const targetSection = document.querySelector("#"+targetId).offsetTop;
  window.scrollTo({
    top: targetSection-100,
    behavior: 'smooth',
  })
});


//login check up
const name = localStorage.getItem('name');
const pass = localStorage.getItem('pass');

if(name && pass){
  setState({...States,isLogin:true});
}
else
  setState({...States,isLogin:false});

},[States.isLogin])






return (
    <>
     <MyContext.Provider value={{States,setState}} >
     <Header/>
     {States.loginModal && <Modal><Login/></Modal>}
     {States.signUp && <Modal><AddUser/></Modal>}
     <MobileNav/>
     {States.booking && <Modal><Booked/></Modal>}
     {States.addDish && <Modal><AddDish/></Modal>}
     {States.deleteDish.open && <Modal><DeleteDish/></Modal>}
     {States.dish.open && <Modal><Dish item={States.dish.item}/></Modal>}
     {States.delete.open && <Modal><Delete /></Modal>}
     {States.messageDetail.open && <Modal><Message /></Modal>}
     {States.updateDish.open && <Modal><Upadate /></Modal>}
     <Home />
     <AboutUs />
     <Menu />
     {States.isLogin ? <Messages /> : <FindUs/>}
     <Footer/>
    </MyContext.Provider>
    </> 
  )
}

export default App
