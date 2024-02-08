import React from "react";
import Section4data from "./Section4data";
import Section4cards from "./Section4cards";

function Section4() {
    const details_card = Section4data.map(datacontent => {
        return <Section4cards {...datacontent} key={datacontent.id}/>
    })
    return (
        <div className="section4">
            <div className="sec4content">
            <h1>
                  <p>Our Expertise</p>
                  &nbsp;&nbsp;&nbsp;&nbsp; Special crafted courses <br />
                Learn from Industry experts
            </h1>
            </div>
            <div className="section4cards">
            {details_card}
            </div>
        </div>
    )
}

export default Section4;