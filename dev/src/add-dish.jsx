
import cross from "./assets/cross.svg";
import { useContext,useEffect} from "react";
import MyContext from "./context";





export default function AddDish(props){

  let {States,setState} = useContext(MyContext);



let closeAddDish = ()=>{
  setState({...States,addDish:false})
}


useEffect(()=>{

  document.querySelector("#add-dish").addEventListener("click",(e)=>{
    e.preventDefault();
    let form = document.querySelector("form");
    let formdata = new FormData(form);
    let status = document.querySelector("#status-message");

    fetch("http://localhost:7777/add-dish",{
        method: 'POST',
        body: formdata
      }).then((res) => res.json()).
      then((res) =>{
       if(res['insert']){
        status.style.color = "green";
        status.innerHTML = " successfully Add a Dish :)";
        form.reset();
       }
       else{
        status.style.color = "red";
        status.innerHTML = res['message'];
       }

      }).catch((err)=>{
         console.log(err);
      })

})


},[])


    return <>
    <div className="add-dish">
        <div>
           <img onClick={closeAddDish} className="cross" src={cross} alt="cross" height={"30px"} width={"30px"} />
        </div>
    <center style={{marginBottom:"10px"}}><h2>Add New Dish</h2></center>
    <form encType="multipart/form-data">
      <div className="form-group">
        <label >Name of the Dish</label>
         <input type="text" name="name" required />
      </div>
      <div className="form-group">
        <label>Price</label>
         <input type="number" name="price" required />
      </div>
      <div className="form-group">
        <label >Ingrediaent</label>
         <input name="ingred" type="text" required />
         <p style={{fontSize:".8rem",margin:"2px",color:"red"}}>Please use comma for seperate an ingedient</p>
      </div>
      <div className="form-group">
        <label >Energy</label>
         <input name="energy" type="number" required />
      </div>
      <div className="form-group">
        <label>Image</label>
        <input type="file" name="image" accept="image/*" />
        <p style={{fontSize:".8rem",margin:"2px",color:"red"}}>Allowed Only one & not more than 1mb size</p>
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea name="desc" rows="6" required></textarea>
        <p id="status-message" style={{color:"red",fontSize:".9rem"}}></p>
      </div>
      <button id="add-dish">Submit</button>
    </form>
  </div>
</>
}