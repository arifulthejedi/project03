
import cross from "./assets/cross.svg";
import { useState, useEffect, useContext } from "react";
import MyContext from "./context";

export default function Delete(props) {

    let { States, setState } = useContext(MyContext);

    let closeModal = () => {
        setState({ ...States, delete: {open:false,id:null,route:null} })
    }




    useEffect(() => {

        //admin
        const name = localStorage.getItem('name');
        const pass = localStorage.getItem('pass');


        document.querySelector("#del-item").addEventListener("click", () => {

        //deleting request
        fetch(`http://localhost:7777/delete-${States.delete.route}`, {
                 method: "POST",
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    admin: { name: name, pass: pass },
                    id: States.delete.id
                })
            }).then((res) => res.json()).then((res) => {
                if(res['delete']){
                    //toast for successfully deleted
                    setState({...States,delete:{open:false,id:null,route:null}});
                    //reset the message or booking component
                    console.log("Delete Successfully");

                }
                else{
                    setState({...States,delete:{open:false,id:null,route:null}});
                    console.log(res)
                }
            }).catch((err) => {
                console.log(err)
            })

 })

},[States.Delete])


 return <>
        <div id="delete-dish">
            <div onClick={closeModal} className="cross">
                <img src={cross} alt="cross" height={"30px"} width={"30px"} />
            </div>
            <div className="container">
                <center><h3>Are you want to delete the item ?</h3></center>
                <div className="btn-group">
                    <button id="del-item">Yes</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    </>
}