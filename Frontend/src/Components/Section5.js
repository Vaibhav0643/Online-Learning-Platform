import React from "react";
import image1 from "../Images/sec5.jpg";
import image2 from "../Images/sec5_2.jpg";
import image3 from "../Images/sec5_3.jpg";

function Section5() {
    return (
        <div className="section5">
            <div className="section5-part1">
            <p>Enroll into Programs</p>
            <h1>Learning Begins</h1>
            <h4>Gather a strong sense of community in our school community and social approaches.</h4>

            <h4><b>Video Conferencing</b></h4>
            <h5>- Available in WPLMS education
            <br />
             - K-12 and Schooling Supported</h5>

            <h4><b>Online Examinations</b></h4>
            <h5>- Available in WPLMS education
            <br />
            - K-12 and Schooling Supported</h5>

            <h4><b>University and schools</b></h4>
            <h5>- Introductory panels
             <br />- Special discounts for new referrals</h5>

            </div>
            <div className="section5-part2">
            <img src={image1} alt="" />
            </div>
            <div className="section5-part3">
            <img src={image2} alt=""  className=""/>
            <img src={image3} alt="" />
            </div>
        </div>
    )
}

export default Section5;