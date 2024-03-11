import React from "react";
import CountUp from 'react-countup';

function Section2cards(props) {
    return (
        <div className="section2_cards" key={props.id}>
            <h1><CountUp start={0} end={props.number} duration={3}>
            </CountUp> +</h1>
            <h5>{props.topic}</h5>
            <p>{props.content}</p>
        </div>
    )
}

export default Section2cards;