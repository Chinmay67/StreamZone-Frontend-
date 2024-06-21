// import React from 'react'
import './login.css'

function Login() {
    return (
        <>
            <div className="background">
                <div className="container1">
                    <h1>Login</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required/>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <div className="signup-link">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
