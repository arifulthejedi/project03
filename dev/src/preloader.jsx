import preloader from "./assets/preloader1.gif";

//preloader
export default function Preloader(props){

    return <>
    <div className="preloader">
        <img src={preloader} alt="loading..." />
        <h3>Loading...</h3>
    </div>
    </>
}