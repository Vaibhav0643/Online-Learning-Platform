import './Login.css'



function Login() {


    return (

        <div class="login-form-container">
            <form>
                <h3>Sign in to your account.</h3>
                <div className='input_heading'>EMAIL</div>
                <input type="email" placeholder="name@email.com" class="box" />
                <div className='input_heading'>PASSWORD</div>
                <input type="password" placeholder="Enter your password" class="box" />
                <div className="password_hint">
                    <button className="forgot">Forgot password?</button>
                </div>


                {/* <input type="submit" value="login"class="btn" /> */}

<button className='btn'>Login <span>&#x2192; </span></button>


                <hr class="divider" />
                <p> don't have an account <a href="#">Sign Up</a> </p>
            </form>
        </div>

    )
}

export default Login