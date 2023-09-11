import item from "./assets/item.jpg";

import { useState,useEffect,useContext} from "react";
import MyContext from "./context";


export default function MenuItem(props){

let url = "http://localhost:7777/uploads/";
 let {States,setState} = useContext(MyContext);

let openModalDelete = ()=>{
    setState({...States,deleteDish:{open:true,id:props.item.id}});
}

let openModalDish = ()=>{
    setState({...States,dish:{open:true,item:props.item}});
}


let openModalUpdate = ()=>{
    setState({...States,updateDish:{open:true,item:props.item}});
}

let str = props.item.description.substring(0, 30)+"...";

return <>
     <div className="item">
                <div className="pic">
                    <img src={url+props.item.file} loading="lazy" alt="food"/>
                </div>
                <div className="desc">
                    <h5>{props.item.name}</h5>
                    <p>
                        {props.item.description.length > 40 ? props.item.description.substring(0, 40)+"..." : props.item.description}
                    </p>
                    <p className="item-price">{props.item.price+"$"}</p>
                    {States.isLogin ? 
                    <div className="btn-group">
                       <button onClick={openModalDish}>Read More</button>
                       <div className="btn-group">
                       <button className="delete" onClick={openModalDelete} >Delete</button>
                       <button onClick={openModalUpdate} className="update">Update</button>
                       </div>
                    </div>
                    :<button onClick={openModalDish}>Read More</button>
                   }
                </div>
        </div>
    </>
}