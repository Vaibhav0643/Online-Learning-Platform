import React from "react";
import Section3data from "./Section3data";
import Section3cards from "./Section3cards";
function Section3() {
    const details_card = Section3data.map(datacontent => {
        return <Section3cards {...datacontent} key={datacontent.id}/>
    })
    return (

        <div className="section3">
            <h1>Popular Courses</h1>
            <div className="section3cards">
                {details_card}
            </div>
        </div>
    )
}

export default Section3;