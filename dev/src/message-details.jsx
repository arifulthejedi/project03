//opup the full messaeg and details

import cross from "./assets/cross.svg";
import { useState,useEffect,useContext} from "react";
import MyContext from "./context";

export default function Message({item}){

let {States,setState} = useContext(MyContext);


let close = ()=>{
    setState({...States,messageDetail:{open:false,item:null}});
}


console.log(States.messageDetail);

return <>
<div id="message">
<div className="popup-container">
    <div className="dish-container">
        <div onClick={close} className="cross">
          <img src={cross} alt="cross" height={"30px"} width={"30px"} />
        </div>
        <div className="section-1">
           <h1>Name:{States.messageDetail.item[0]}</h1>
        </div> 
        <div className="section-2">
        <h3>Email:{States.messageDetail.item[1]}</h3>
        <p>Message:{States.messageDetail.item[2]}</p>
        </div>       
      </div>
    </div>
</div>
</>
}