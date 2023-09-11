import dish from "./assets/chicken.png"

export default function AboutUs(props) {


    return <>
        <div id="about">
            <div className="image">
                <img src={dish} height={"100%"} width={"100%"} />
            </div>
            <div className="container">
                <center><h2>About <span style={{ color: "orange" }}>Jungle Lounge</span></h2></center>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt alias maxime vel mollitia, facilis ut nam perferendis totam voluptatum possimus! Repellat laboriosam ad suscipit eius cumque aliquid mollitia, ratione rerum!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt alias maxime vel mollitia, facilis ut nam perferendis totam voluptatum possimus! Repellat laboriosam ad suscipit eius cumque aliquid mollitia, ratione rerum!
                </p>
            </div>
        </div>
    </>
}