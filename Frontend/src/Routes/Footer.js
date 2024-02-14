import React from "react";
import Footerdata from "../Components/Footerdata";
import Footercards from "../Components/Footercards";
import Footerend from "../Components/Footerend";
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