import React from "react";
import "../Assets/Footer.css"

function Footercards(props) {
    const isAboutSection = props.sectionname === "ABOUT";

    return (
        <div className="footercards">
            {isAboutSection? (
                <div className="content1">
                    <h4>{props.sectionname}</h4>
                    <h1>Online <span>Education</span> at your fingertips</h1>
                    <p>All in one academy for your corporate management system.</p>
                </div>
            ) : (
                <div className="content2">
                    <h4>{props.sectionname}</h4>
                    <p>
                        Members Directory <br />
                        Groups Directory <br />
                        All Courses <br />
                        Contact us <br />
                    </p>
                </div>
            )}
        </div>
    );
}

export default Footercards;
