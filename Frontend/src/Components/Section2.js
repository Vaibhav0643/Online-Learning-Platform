import React from "react";
import Section2data from "./Section2data";
import Section2cards from "./Section2cards";

function Section2()
{
    const details_card=Section2data.map(datacontent=>{
        return <Section2cards {...datacontent} key={datacontent.id}/>
    })
    return (
    <div className="section2">
        {details_card}
    </div>
    )
}

export default Section2;