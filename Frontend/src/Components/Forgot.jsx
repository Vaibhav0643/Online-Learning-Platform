import '../Assets/Forgot.css';

function Forgot() {


    return (

        <div className='app_content'>
            <div>

                <div>
                    <div className="forgot-form-container">
                        <form>
                        <div >
                            <h3>Reset your password.</h3>
                            <p className='header_description'>
                                < span >Enter the email address you used when you signed up for our platform.
                                </span>
                            </p>
                        </div>


                            <input type="email" placeholder="name@email.com" className="box" />
                            <button className='btn'>Reset Password <span>&#x2192; </span></button>
                            <hr className="divider" />
                            <p>Back to <a href="/">Login</a> </p>
                        </form>
                    </div>

                </div>

            </div >
        </div >
    )
}

export default Forgot