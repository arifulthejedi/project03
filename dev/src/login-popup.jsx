import admin from "./assets/admin.jpg";
import name from "./assets/name.svg";
import pass from "./assets/pass.svg";
import cross from "./assets/cross.svg";
import MyContext from "./context";

import { useContext, useEffect } from "react";




export default function Login(props){

let {States,setState} = useContext(MyContext);

let closeLogin = ()=>{
    setState({...States,loginModal:false})
}

let sub = "";

//set login request
useEffect(()=>{
   
   document.querySelector(".submit").addEventListener("click",(e)=>{
      e.preventDefault();
      let n = document.querySelector("#login-name").value;
      let password = document.querySelector("#login-pass").value;
      
      fetch("http://localhost:7777/login",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({admin:{name:n,pass:password}})
      }).then((data) => data.json()).
      then((js)=>{
      if(js['login']){
 
        //setting the login state
        setState({...States,isLogin:true,loginModal:false})

        //setting in local storage
        localStorage.setItem('name', n);
        localStorage.setItem('pass', password);
      }
      else{
        document.querySelector("#status-message").innerText = "Something went wrong please try again";
        console.log(js);
      }
        
       }).catch((err)=>{
        console.log(err.message)
       })
   })

},[])

    return <>
    <div id="login">
        <div className="section-1">
            <img  loading="lazy" src="https://homemydesign.com/wp-content/uploads/2019/09/amazing-bar-and-restaurant-design-with-indoor-plants.jpg"  alt="admin"/>
        </div>
        <div className="section-2">
            <img onClick={closeLogin} className="cross" src={cross} alt="cross" height={"30px"} width={"30px"} />
            <h2>Jungle Launge</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, suscipit.</p>
            <form>
                 <div className="inpt">
                    <img src={name} alt="icon" height={"30px"} width={"30px"} />
                    <input id="login-name" type="text" placeholder="Name" alt="name" />
                 </div>
                 <div className="inpt">
                    <img src={pass} alt="icon" height={"30px"} width={"30px"} />
                    <input id="login-pass" type="password" placeholder="Password" alt="pass" />
                 </div>
                 <p id="status-message" style={{color:"red",fontSize:".8rem"}}></p>
                 <div className="submit">
                     <button >Log In</button>
                 </div>
            </form>
        </div>
    </div>
 </>
}