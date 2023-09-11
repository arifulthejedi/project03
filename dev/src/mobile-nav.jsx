import cross from "./assets/cross.svg";
import { useEffect,useRef,useContext } from "react";
import MyContext from "./context";


export default  function MobileNav(props){

    let {States,setState} = useContext(MyContext);


useEffect(()=>{
    let dom = document.querySelectorAll("#nav-mobile .nav-bar a");

    dom.forEach((a)=>{
        a.addEventListener("click",()=>{
           setState({...States,mNav:false})
        })
    })
       
},[])



//mNav
let closeNav = ()=>{
    setState({...States,mNav:false})
}

//booking
let openBooking = ()=>{
    setState({...States,mNav:false,booking:true})

}
    return <>
    <div className={States.mNav ? "show" : "hide"} id="nav-mobile">
        <div onClick={closeNav} className="nav-cross">
            <img src={cross} alt="cross-button"  width={"40px"} height={"40px"}/>
        </div>
        <div className="nav-bar">
          <a href="home">Home</a>
          <a href="about">About Us</a>
          <a href="menu">Our Menu</a>
          <a href="find-us">Find Us</a>
        </div>
        <div className="btns">
            <button onClick={openBooking}>Book a Table</button>
        </div>
    </div>
    </>
}