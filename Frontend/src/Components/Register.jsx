import '../Assets/Register.css';



function Register() {


    return (

        <div className="login-form-container">
            <form>
                <h3>Create your account.</h3>
                <div className="input_heading">NAME</div>
                <input type="text" placeholder='Enter your full name' className="box" />
                <div className='input_heading'>EMAIL</div>
                <input type="email" placeholder="name@email.com" className="box" />
                <div className='input_heading'>PASSWORD</div>
                <input type="password" placeholder="Enter your password" className="box" />
                <button className='btn'>Sign Up <span>&#x2192; </span></button>
                
                <hr className="divider" />
                <p> Already have an account?  <a href="/">Login</a> </p>
            </form>
        </div>

    )
}

export default Register