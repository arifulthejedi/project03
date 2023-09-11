import item from "./assets/item";

export default function Dish(props){



    return <>
     <div className="item">
                <div className="pic">
                    <img src={item}  alt="food"/>
                </div>
                <div className="desc">
                    <h3>Name of the Dishe</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    </p>
                    <p className="item-price">$23</p>
                    <button>Read More</button>
                </div>
        </div>
    </>
}