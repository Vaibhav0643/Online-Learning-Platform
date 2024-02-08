import React from "react";

function Section4cards(props)
{
    return(
        <div className="section4_cards">
            <img src={`../Image/${props.image}`} alt="" />
            <h2>{props.name}</h2>
            <h5>{props.expertise}</h5>
            <p>{props.designation}</p>
        </div>
    )
}

export default Section4cards;