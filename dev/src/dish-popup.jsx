
// import item from "./assets/item.jpg";
import cross from "./assets/cross.svg";
import { useState,useEffect,useContext} from "react";
import MyContext from "./context";




export default function Dish(props){

  let {States,setState} = useContext(MyContext);
  let url = "http://localhost:7777/uploads/";

  let closeDish = ()=>{
     setState({...States,dish:{open:false,item:{}}});
     console.log(States.dish.open)
  }

  let ingred = props.item.ingredients.split(",");

  console.log(ingred);


    return <>
    <div className="popup-container">
    <div className="dish-container">
        <div onClick={closeDish} className="cross">
          <img src={cross} alt="cross" height={"30px"} width={"30px"} />
        </div>
        <div className="section-1" id="dish">
        <div className="section-1">
              <img src={url+props.item.file}  alt="dish" style={{width:"100%",height:"100%"}}/>
         </div>
         <div className="section-2">
         <p className="price">Price:<span style={{color:"red"}}>{" "+props.item.price}$</span></p>
         <p className="ingred">
           Ingredients:{
            ingred.map((item,index)=>{
              return <a>{item}</a>
            })
           }
         </p>
         <p className="energy">Calories:<span>{" "+props.item.energy+" "}</span>cal</p>
        </div>
        </div> 
        <div className="section-2">
        <h2>{props.item.name}</h2>
         <p className="dish-desc">{props.item.description}</p>
        </div>       
      </div>
    </div>
    </>
}