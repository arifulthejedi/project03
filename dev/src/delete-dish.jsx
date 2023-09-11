
import cross from "./assets/cross.svg";
import { useState, useEffect, useContext } from "react";
import MyContext from "./context";

export default function DeleteDish(props) {

    let { States, setState } = useContext(MyContext);

    let closeModal = () => {
        setState({ ...States, deleteDish: { open: false } })
    }




    useEffect(() => {

        //admin
        const name = localStorage.getItem('name');
        const pass = localStorage.getItem('pass');


        document.querySelector("#del-dish").addEventListener("click", () => {

        fetch("http://localhost:7777/delete-dish", {
                 method: "POST",
                header: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    admin: { name: name, pass: pass },
                    dish: { id: States.deleteDish.id }
                })
            }).then((res) => res.json()).then((res) => {
                if(res['delete']){
                    //toast for successfully deleted
                    setState({...States,deleteDish:{open:false}})
                }
            }).catch((err) => {
                console.log(err)
            })
        })
 })


 return <>
        <div id="delete-dish">
            <div onClick={closeModal} className="cross">
                <img src={cross} alt="cross" height={"30px"} width={"30px"} />
            </div>
            <div className="container">
                <center><h3>Are you want to delete the dish ?</h3></center>
                <div className="btn-group">
                    <button id="del-dish">Yes</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    </>
}