//pattern of every table item
import { useEffect, useState,useContext } from "react";
import MyContext from "./context";


export default function Tr({item,id,details,route}){

    let { States, setState } = useContext(MyContext);


    let openDelete = ()=>{
        setState({...States,delete:{open:true,id:id,route:route}}) 
     }

   //message detail functionality
   //   let openDetails = ()=>{
   //      setState({...States,messageDetail:{open:true,item:item}}) 
   //      console.log(item);
   //   }
     

return <>
               <tr>
                  {item.map((val,i)=>(
                       <td key={i}>{val}</td>
                  ))}
                {details && <td><button onClick={openDetails} className="details">Details</button></td>}
                <td><button onClick={openDelete}>Delete</button></td>
                </tr>
</>
}