import name from "./assets/name.svg";
import pass from "./assets/pass.svg";
import cross from "./assets/cross.svg";
import MyContext from "./context";
import { useContext,useEffect} from "react";



export default function AddUser(props){

    let {States,setState} = useContext(MyContext);

//open sign up or ad user
let closesignUp = ()=>{
    setState({...States,signUp:false})
  }




useEffect(()=>{
//adding user to database

document.querySelector("#add-user").addEventListener("click",(e)=>{
    e.preventDefault();
    let form = document.querySelector("form");
    let userName = document.querySelector("#user-name").value;
    let userPass = document.querySelector("#user-pass").value;

    //admin
    const name = localStorage.getItem('name');
    const pass = localStorage.getItem('pass');


    let status = document.querySelector("#status-message");

    //console.log(userName,userPass,name,pass);

    fetch("http://localhost:7777/sign-up",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Add other headers if needed
          },
        body: JSON.stringify({admin:{name:name,pass:pass},user:{name:userName,pass:userPass}})
      }).then((res) => res.json()).
      then((res) =>{
       if(res['insert']){
        status.style.color = "green";
        status.innerHTML = "Added user successfully :)";
        form.reset();
        fetchItem();
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
        <div id="login">
        <div className="section-1">
            <img loading="lazy" src="https://i.pinimg.com/736x/20/31/ac/2031ac75ebe2630779073a3fc4f82653--outdoor-wedding-venues-tulum-mexico.jpg"  alt="admin"/>
        </div>
        <div className="section-2">
            <img onClick={closesignUp} className="cross" src={cross} alt="cross" height={"30px"} width={"30px"} />
            <h2>Add a User</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, suscipit.</p>
            <p id="status-message"></p>
            <form>
                 <div className="inpt">
                    <img src={name} alt="icon" height={"30px"} width={"30px"} />
                    <input id="user-name" type="text" placeholder="Name" alt="name" required/>
                 </div>
                 <div className="inpt">
                    <img src={pass} alt="icon" height={"30px"} width={"30px"} />
                    <input id="user-pass" type="password" placeholder="Password" alt="pass" required/>
                 </div>
                 {/* <div className="inpt">
                    <img src={pass} alt="icon" height={"30px"} width={"30px"} />
                    <input type="password" placeholder="confirm password" alt="pass" />
                 </div> */}
                 <div id="add-user" className="submit">
                     <button>Add</button>
                 </div>
            </form>
        </div>
    </div>
    </>
}