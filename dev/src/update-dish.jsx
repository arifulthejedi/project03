//update the menu item
import MyContext from "./context";
import { useContext, useEffect } from "react";
import cross from "./assets/cross.svg";


export default function Upadate(props){

let { States, setState } = useContext(MyContext);


let closeModal = ()=>{
    setState({...States,updateDish:{open:false,item:{}}})
}


useEffect(()=>{

    document.querySelector("#update-dish").addEventListener("click",(e)=>{
      e.preventDefault();
      //auth
      const name = localStorage.getItem('name');
      const pass = localStorage.getItem('pass');
      let form = document.querySelector("form");
      let formdata = new FormData(form);
      formdata.append("id",States.updateDish.item.id);
      formdata.append("authname",name);
      formdata.append("authpass",pass);

      let status = document.querySelector("#status-message");
      console.log(States.updateDish.item.id);
      fetch("http://localhost:7777/update-dish",{
          method: 'POST',
          body: formdata
        }).then((res) => res.json()).
        then((res) =>{
         if(res['update']){
          status.style.color = "green";
          status.innerHTML = " successfully Update a Dish :)";
          //form.reset();
         }
         else{
          status.style.color = "red";
          status.innerHTML = res['message'];
          console.log(res);
         }
  
        }).catch((err)=>{
           console.log(err);
        })
  
  })
  },[])


return <>
    <div id="update">
    <div className="add-dish">
        <div>
           <img onClick={closeModal}  className="cross" src={cross} alt="cross" height={"30px"} width={"30px"} />
        </div>
    <center style={{marginBottom:"10px"}}><h2>Update <span>{States.updateDish.item.name}</span></h2></center>
    <form encType="multipart/form-data">
      <div className="form-group">
        <label >Name:</label>
         <input type="text" name="name" defaultValue={States.updateDish.item.name} required />
      </div>
      <div className="form-group">
        <label>Price:</label>
         <input type="number" name="price" defaultValue={States.updateDish.item.price} required />
      </div>
      <div className="form-group">
        <label >Ingredients:</label>
         <input name="ingred" type="text" defaultValue={States.updateDish.item.ingredients} required />
         <p style={{fontSize:".8rem",margin:"2px",color:"red"}}>Please use comma for seperate an ingedient</p>
      </div>
      <div className="form-group">
        <label >Energy:</label>
         <input name="energy" type="number" defaultValue={States.updateDish.item.energy} required />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea name="desc" rows="6" defaultValue={States.updateDish.item.description} required></textarea>
        <p id="status-message" style={{color:"red",fontSize:".9rem"}}></p>
      </div>
      <button id="update-dish">Update</button>
    </form>
  </div>
</div>
</>
}