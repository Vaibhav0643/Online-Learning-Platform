import React from "react";

function CoursesAvailable(props) {
    return (
        <div className="courses-available" onClick={props.onClick}>
            <img src={props.image} alt="" className="course-available-image" />
            <div className="course-available-content">
                 <b>
                <p>{props.coursename}  <span className="courses-available-rating">{props.ratings} star</span></p>
            </b>
            <i>
                <p className="grey">{props.coursetutior} </p>
                {/* <p className="grey">{props.date}</p> */}
            </i>
            <p className="Duration">
                <b>{props.duration} </b>
                <span className="fade">hours</span>
            </p>
            </div>
        </div>
    )
}

export default CoursesAvailable;
