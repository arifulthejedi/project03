
import { useEffect } from "react";

export default function FindUs(props) {


useEffect(()=>{


document.querySelector("#msg-submit").addEventListener("click",(e)=>{
    e.preventDefault();
    let form = document.querySelector("form");
    let formdata = new FormData(form);
    let status = document.querySelector("#status-message");

    fetch("http://localhost:7777/message",{
        method: 'POST',
        body: formdata
      }).then((res) => res.json()).
      then((res) =>{
       if(res['submit']){
        status.style.color = "green";
        status.innerHTML = "submitted successfully :)";
        form.reset();
       }
       else{
        status.style.color = "red";
        status.innerHTML = "Somethings went wrong, please try again :(";
       }

      }).catch((err)=>{
         console.log(err);
      })

})
},[])   

return <>
        <div id="find-us">
            <div id="googlrMap" className="section-1">
               <center><h3>Google Map</h3></center>
            </div>
            <div className="section-2">
                <div className="container">
                <form encType="multipart/form-data">
                    <center><h3>Contact Us</h3></center>
                    <label >Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label >Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label >Message:</label>
                    <textarea id="message" name="message" rows="4" required></textarea>
                 </form>
                    <p id="status-message" style={{color:"red"}}>Please try write within 100 words</p>
                    <button id="msg-submit">Submit</button>
                </div>
            </div>
        </div>
    </>
}