import "../Assets/Enrollment.css";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Enrollment() {
  function SuccesfulEnroll(event)
    {

      event.preventDefault();
      const name = event.target.form[0].value;
      const email = event.target.form[1].value;
      const phoneNumber = event.target.form[2].value;
      const dob = event.target.form[3].value;
      const collegeOrOrganization = event.target.form[4].value;

      if (!name || !email || !phoneNumber || !dob || !collegeOrOrganization) {
        toast.error('Please fill in all fields.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return; // Stop the function if any field is empty
      }
      toast.success('Successfully registered!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  return (
    <div className='app_content'>
      <div>
        <div className="enroll-form-container">
          <form>
            <div>
              <h3>Enrollment Form.</h3>
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

            <button className="btn" onClick={SuccesfulEnroll}>
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
      <ToastContainer/>
    </div>
  );
}

export default Enrollment;