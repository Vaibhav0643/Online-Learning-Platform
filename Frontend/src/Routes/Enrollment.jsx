import "../Assets/Login.css";

function Enrollment() {
    return (
      <div className='app_content'>
        
          <div className="login-form-container">
            <form>
              <div>
              <h3>Enrollment Form</h3>
                <p className='header_description'>
                  <span>Enroll in our courses and get certified by the best in the industry. <br />
                  </span>
                </p>
                <hr className="divider" />
              </div>

              <div className="input_heading">Name</div>
              <input
                type="text"
                placeholder="Enter your full name"
                className="box"  
              />

              <div className="input_heading">Email</div>
              <input
                type="email"
                placeholder="name@email.com"
                className="box"
              />

              <div className="input_heading">Phone Number</div>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="box"
              />
              
              <div className="input_heading">Date Of Birth</div>
              <input
                type="date"
                placeholder="Enter your DOB"
                className="box"
              />

              <div className="input_heading">College/Organization</div>
              <input
                type="text"
                placeholder="Enter name of your college/organization"
                className="box"
              />

              <button className="btn">
                Enroll <span>&#x2192; </span>
              </button>

              <hr className="divider" />
              <p className='footer_description'>
                {" "}
                Back to <a href="/courses">Courses</a>{" "}
              </p>
            </form>
          </div>

      </div>
      );
    }
    
export default Enrollment;