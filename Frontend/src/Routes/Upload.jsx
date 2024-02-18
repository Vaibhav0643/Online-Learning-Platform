import "../Assets/Enrollment.css";

function Upload() {
  return (

    <div className='app_content'>
      <div>
        <div className="enroll-form-container">
          <form>
            <div>
              <h3>Course Upload Form.</h3>
              
              <hr className="divider" />
            </div>

            <div className="input_heading">Admin Name</div>
            <input
              type="text"
              placeholder="Enter your name"
              className="box"
            />

            <div className="input_heading">Course Name</div>
            <input
              type="text"
              placeholder="Enter course name"
              className="box"
            />

            <div className="input_heading">Course Tutor</div>
            <input
              type="text"
              placeholder="Enter tutor's name"
              className="box"
            />

            <div className="input_heading">Course Description</div>
            <input
              type="text"
              placeholder="Enter description of course"
              className="box"
            />

            <div className="input_heading">Course Length</div>
            <input
              type="text"
              placeholder="Enter course length"
              className="box"
            />

            <div className="input_heading">Video Links</div>
            <input
              type="text"
              placeholder="Enter video links in order and separated by space"
              className="box"
            />

            <button className="btn">
              Upload <span>&#x2192; </span>
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}

export default Upload;