import React,{useState} from  "react";
import "../Assets/Courses.css";
import Details_data from "../Components/Details_data";
import CoursesAvailable from "../Components/CoursesAvailable";
import EnrollCourseCard from "../Components/EnrollCourseCard";
import Header from "./Header"
import Footer from "./Footer"

function Courses()
{

  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

    return (

        <div className="courses">
        <Header/>
        {selectedCourse && <EnrollCourseCard {...selectedCourse} />}
          <h1 className="course-heading">Courses Available</h1>
          <div className="course-select">
            {Details_data.map((course) => (
              <CoursesAvailable
                key={course.id}
                {...course}
                onClick={() => handleCourseClick(course)}
              />
            ))}
          </div>

          <Footer/>
        </div>
      );
    }

export default Courses;