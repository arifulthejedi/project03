//list of bookings


import Preloader from "./preloader";
import Tr from "./table-item";
import { useState, useEffect, useContext } from "react";
import MyContext from "./context";

export default function Bookings(props){


let [reservations,getReservations] = useState([]);
let [loading,setLoading] = useState(true);
let [empty,setEmpty] = useState(true);
let { States, setState } = useContext(MyContext);



let fetchBooking = () => {

    const name = localStorage.getItem('name');
    const pass = localStorage.getItem('pass');
    
      fetch(`http://localhost:7777/bookings`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({admin:{name:name,pass:pass}}),
      }).then((res) => res.json()).then((data)=>{
            if(data.length == 0){
              setLoading(false);
              setEmpty(true);
              getReservations(data);
       
            }
            else{
              getReservations(data);
              setLoading(false);
              setEmpty(false);
            }
            
        }).catch((err)=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        fetchBooking();
    },[States.delete])

    return <>
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Person</th>
              <th>Dlete</th>
            </tr>
            </thead>
            <tbody>
            {loading ? <Preloader/> : reservations.map((item,index) => (
                <Tr route={'booking'} key={index} item={[item.name,item.email,item.phone,item.date,item.person]} k={index} id={item.id}/>
            ))}
            </tbody>
          </table>
          {empty && <center><h3 style={{color:"red"}}>No Record Found </h3></center>}
          {/* <center> //you can add pagination
             <button>&laquo;</button>
             <button>&raquo;</button>
        </center> */}
    </>
}