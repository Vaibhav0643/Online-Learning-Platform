import React from "react";

function CourseCard(props) {
    return (
        <div className="courses-enrolled-data">
            <div className="courses-img-data">
                <img src={`../Image/${props.image}`} alt="coursesimage" />
                <div className="courses-content">
                    <h2>{props.course_name}</h2>
                    <p>{props.course_data}</p>
                </div>
            </div>
        </div>
    )
}
export default CourseCard;