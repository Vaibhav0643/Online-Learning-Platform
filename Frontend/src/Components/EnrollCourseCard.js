import React from "react";
import { useNavigate , useParams} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

function EnrollCourseCard(props)
{
    let navigate=useNavigate();
    const params = useParams();
    const id = params.id;

    const enroll = () => {
        const cookies = new Cookies();
        axios
          .post(
            `https://online-learning-platform-r55m.onrender.com/api/v1/course/${id}/enrollUser`,
            {},
            {
              headers: {
                Authorization: "Bearer " + cookies.get("token"),
              },
            }
          )
          .then((res) => {
            window.location.reload();
          })
          .catch((error) => {
            if (error.response.status === 400) {
              alert("You are already enrolled");
            }
          });
      };
    // function handleClick()
    // {
    //     navigate("/enrollment");
    // }
    return(
        <div className="enroll-course">
            <img src={props.courseBannerImage} alt="coursebanner" />
            <div className="course-enroll-data">
                <h1>{props.courseTitle}</h1>
                {/* <h4>{props.coursetutior}</h4> */}
                <p>{props.courseDescription}</p>
                {/* <h5>{props.ratings} Star</h5> */}
                <h5>{props.videoCount} Videos</h5>

                <button className="enroll-button" onClick={enroll}>Enroll Now</button>

            </div>
        </div>
    )
}

export default EnrollCourseCard;