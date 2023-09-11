
import { useState,useRef,useEffect,useContext} from "react";
import MyContext from "./context";
import ContactMessages from "./contact-messages";
import Bookings from "./bookings";


export default function Messages(props) {

  let {States,setState} = useContext(MyContext);

  //re-render component after deleting


return <>
    <div id={States.isLogin ? "users-data" : "find-us"} className="messages">
      <div id="googlrMap" className="section-1" >
      <div className="container">
      <center><h2>Booking List</h2></center>
          <Bookings className="table"/>
         <div>
        </div>
        </div>
      </div>
      <div className="section-2">
        <div className="container">
           <center><h2>Messages</h2></center>
          <ContactMessages className="table" />
        </div>
      </div>
    </div>
  </>
}