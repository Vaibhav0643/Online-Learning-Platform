import React from "react";

function Section2cards(props)
{
    return(
    <div className="section2_cards" key={props.id}>
            <h1>{props.number}</h1>
            <h5>{props.topic}</h5>
            <p>{props.content}</p>
    </div>
    )
}

export default Section2cards;