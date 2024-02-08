import React from "react";
import main_image from "../Images/women.jpg"

function Section1()
{
    return(
        <div className="section1">
        <div className="content1">
            <p className="heading-1">FUTURE OF</p>
            <p className="heading-2">Online <span>Education.</span></p>
            <p className="heading-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi doloribus id officiis impedit voluptatibus veritatis officia. Reprehenderit porro minima dolor consequatur suscipit eum aperiam temporibus vitae repellendus rem, molestias ad.</p>
            
            <button className="btn">Log In  {' >'}</button>
        </div>
        <div className="content2">
        <img src={main_image} alt="laughing women" className="laughing-women"/>
        </div>
        </div>
    )
}

export default Section1;