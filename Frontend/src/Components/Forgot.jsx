import '../Assets/Forgot.css';



function Forgot() {


    return (

        <div className="login-form-container">
            <form>
                <h3>Reset your password.</h3>
                <div className='input_heading'>EMAIL</div>
                <input type="email" placeholder="name@email.com" className="box" />
                <button className='btn'>Reset Password <span>&#x2192; </span></button>
                <hr className="divider" />
                <p>Back to <a href="/login">Login</a> </p>
            </form>
        </div>

    )
}

export default Forgot