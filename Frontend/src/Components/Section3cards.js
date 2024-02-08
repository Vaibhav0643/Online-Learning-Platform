import React from "react";
// import image from "../Images/machinelearning.jpg";

function Section3cards(props) {
    return (
        <div className="work">
            <img src={`../Image/${props.image}`} alt="course"/>
            
            <div className="layer">
                <h3>{props.course_name}</h3>
                <p>{props.course_data}</p>
            </div>
        </div>
    )
}
export default Section3cards;