import item from "./assets/item.jpg";
import Dish from "./dish-popup";
import Modal from "./modal";
import MenuItem from "./menu-item.jsx";

//packages
import { useState, useEffect, useContext } from "react";
import MyContext from "./context";

import Preloader from "./preloader";


export default function Menu(props){


let [offs,setOff] = useState(0);
let { States, setState } = useContext(MyContext);
let [loading,setLoading] = useState(true);
let [empty,setEmpty] = useState(true);
let [menuItems,getItems] = useState({item:[],count:null});

//paginations
let setForward = ()=>{
    let n = Number(menuItems['count']);
    if( (n-3) > offs){
        setOff((pre) => pre +3)
    }
}


let setBackward = ()=>{
    if(offs > 0){
      setOff((pre) => pre -3)
    }
}

//fetching manu items
let fetchItem = ()=>{
    setLoading(true);
    fetch(`http://localhost:7777/dishes?limit=3&offset=${offs}`).then((res) => res.json()).then((data)=>{
            if(data.count){
                setEmpty(false);
                getItems({item:data.item,count:data.count});
                setLoading(false);
            }else{
                setLoading(false);
                setEmpty(true);
            }
    }).catch((err)=>{
        console.log(err);
    })
}

useEffect(()=>{
    fetchItem();
},[offs,States.deleteDish,States.addDish,States.updateDish]);





return <>
    <div id="menu">
        <div className="heading">
            <center className="menu-title"><h1>Our Menu</h1></center>
            <div className="desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium quaerat ea iste quod saepe reprehenderit consectetur hic repellat fugit temporibus.
            </div>
        </div>
        <div className="items-container">
           {loading ? <Preloader/> : empty ? <center><h3 style={{color:"red"}}>No Record Found</h3></center>:
             menuItems.item.map((item,index)=>(
             <MenuItem key={index} item={item}/>
           ))}
        </div>
        <div className="btn-more">
            <div className="pagination">
               <a id="search-backward" onClick={setBackward}>&laquo;</a>
               <a id="search-forward" onClick={setForward} >&raquo;</a>
            </div>
        </div>
    </div>
    </>
}