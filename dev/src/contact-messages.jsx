//contact messages

import Preloader from "./preloader";
import Tr from "./table-item";

import { useState, useEffect, useContext } from "react";
import MyContext from "./context";

export default function ContactMessages(props){


let [messages,getMessages] = useState([]);
let [loading,setLoading] = useState(true);
let [empty,setEmpty] = useState(true);
let { States, setState } = useContext(MyContext);



let fetchMessages = () => {

    const name = localStorage.getItem('name');
    const pass = localStorage.getItem('pass');
    
      fetch(`http://localhost:7777/messages`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({admin:{name:name,pass:pass}}),
      }).then((res) => res.json()).then((data)=>{
        if(data.length == 0){
          setLoading(false);
          getMessages(data);
          setEmpty(true);
   
        }
        else{
          getMessages(data);
          setLoading(false);
          setEmpty(false);
        }
        }).catch((err)=>{
            console.log(err)
        })
    }

useEffect(()=>{
    fetchMessages();
},[States.delete])

return <>
        <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              {/* <th>Details</th> */}
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {loading ? <Preloader/> : messages.map((item,index) => (
                <Tr route={"message"} key={index} item={[item.name,item.email,item.message]} id={item.id} />
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