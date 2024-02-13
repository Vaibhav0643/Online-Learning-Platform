import React from "react";

function EnrollCourseCard(props)
{
    return(
        <div className="enroll-course">
            <img src={props.image} alt="" />
            <div className="course-enroll-data">
                <h1>{props.coursename}</h1>
                <h4>{props.coursetutior}</h4>
                <p>{props.coursedescription} hours</p>
                <h5>{props.ratings} Star</h5>
                <h5>{props.duration} hours</h5>

                <button className="enroll-button">Enroll Now</button>

            </div>
        </div>
    )
}

export default EnrollCourseCard;