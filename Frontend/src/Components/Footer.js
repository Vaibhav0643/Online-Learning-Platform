import React from "react";
import Footerdata from "./Footerdata";
import Footercards from "./Footercards";
import Footerend from "./Footerend";
import "../Assets/Footer.css"


function Footer()
{
    const details_card=Footerdata.map(datacontent=>{
        return <Footercards {...datacontent} key={datacontent.id}/>
    })
    return(
        <footer>
            {details_card}
            <Footerend/>
        </footer>
    )
}

export default Footer;