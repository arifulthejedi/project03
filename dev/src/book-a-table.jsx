import MyContext from "./context";
import { useContext, useEffect } from "react";
import cross from "./assets/cross.svg"


export default function Booked(props) {

    let { States, setState } = useContext(MyContext);

    let closeBooking = () => {
        setState({ ...States, booking: false })
    }



    useEffect(()=>{


        document.querySelector("#book").addEventListener("click",(e)=>{
            e.preventDefault();
            let form = document.querySelector("form");
            let formdata = new FormData(form);
            let status = document.querySelector("#status-message");
        
            fetch("http://localhost:7777/booking",{
                method: 'POST',
                body: formdata
              }).then((res) => res.json()).
              then((res) =>{
               if(res['submit']){
                status.style.color = "green";
                status.innerHTML = "submitted successfully :)";
                //toast functionality here
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
        <div id="booked">
            <div onClick={closeBooking} className="cross">
                <img src={cross} height={"50px"} width={"50px"} />
            </div>
            <center><h3>Book a Table</h3></center>
            <div className="container">
                <form encType="multipart/form-data">
                    <div className="form-group">
                        <label>Name*:</label>
                        <input name="name" type="text" placeholder="your Name" required/>
                    </div>
                    <div className="form-group">
                        <label>Persons:</label>
                        <select name="person" className="select" id="selectOption">
                            <option defaultValue={""} disabled>Select an option</option>
                            <option value="1" >1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Date*:</label>
                        <input name="date" type="date" placeholder="pick up a date" required/>
                        <p>Every friday resturent is closed</p>
                    </div>
                    <div className="form-group">
                        <label>Phone:</label>
                        <input name="phone" type="phone" placeholder="your phone number"/>
                    </div>
                    <div className="form-group">
                        <label>Email*:</label>
                        <input type="email" name="email" placeholder="your Email" required/>
                    </div>
                    <p id="status-message"></p>
                    <div id="book" className="btn">
                        <button>Booked</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}