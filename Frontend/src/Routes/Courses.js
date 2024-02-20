import React,{useState , useEffect} from  "react";
import axios from "axios"
import "../Assets/Courses.css";
// import Details_data from "../Components/Details_data";
import CoursesAvailable from "../Components/CoursesAvailable";
import EnrollCourseCard from "../Components/EnrollCourseCard";
import Carousel2 from "../Components/Carousel2";
import Header from "./Header"
import Footer from "./Footer"

function Courses()
{  

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchData= async ()=>{
      try {
        const response =await axios.get('https://online-learning-platform-r55m.onrender.com/api/v1/course/getAllCourses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error( error);
      }
    }
  
    fetchData();
  }, []);
  

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

    return (

        <div className="courses">
        <Header/>
        <Carousel2/>
          <h1 className="course-heading">Courses Available</h1>
          <div className="course-select">
            {courses.map((course) => (
              <CoursesAvailable
                key={course.courseId}
                {...course}
                onClick={() => handleCourseClick(course)}
              />
            ))}
          </div>
          {selectedCourse && <EnrollCourseCard {...selectedCourse} />}
          <Footer/>
        </div>
      );
    }

export default Courses;
