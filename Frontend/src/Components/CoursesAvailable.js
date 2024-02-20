import React from "react";

function CoursesAvailable(props) {
    return (
        <div className="courses-available" onClick={props.onClick}>
            <img src={props.courseBannerImage} alt="" className="course-available-image" />
            <div className="course-available-content">
                 <b>
                <p>{props.courseTitle}  <span className="courses-available-rating">{props.videoCount} videos</span></p>
            </b>
            {/* <i>
                <p className="grey">{props.courseDescription} </p>
            </i> */}
            </div>
        </div>
    )
}

export default CoursesAvailable;
