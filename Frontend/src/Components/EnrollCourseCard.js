import React from "react";
import { useNavigate } from "react-router-dom";

function EnrollCourseCard(props)
{
    let navigate=useNavigate();
    function handleClick()
    {
        navigate("/enrollment");
    }
    return(
        <div className="enroll-course">
            <img src={props.image} alt="" />
            <div className="course-enroll-data">
                <h1>{props.coursename}</h1>
                <h4>{props.coursetutior}</h4>
                <p>{props.coursedescription} hours</p>
                <h5>{props.ratings} Star</h5>
                <h5>{props.duration} hours</h5>

                <button className="enroll-button" onClick={handleClick}>Enroll Now</button>

            </div>
        </div>
    )
}

export default EnrollCourseCard;