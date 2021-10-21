import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import Recaptcha from 'react-recaptcha'


export default function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(true)
    const [isRobot, setIsRobot] = useState(true)

    const validate = (e) => {

        var name_e = /^[A-Za-z]+[A-Za-z ]*[A-Za-z]$/;
        var username_e = /^([A-Za-z_]+[A-Za-z0-9_]*){1,}/;
        var password_e = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;


        if (!user.match(name_e))
            return "Are you sure you entered your name correctly?"
        else if (!username.match(username_e))
            return "Username must starts with a Alphabet or underscore"
        else if (email === "")
            return "Email Can't be empty"
        else if (!password.match(password_e))
            return "Password must include a uppercase, lowercase, number and special character"
        else if (password !== confPassword)
            return "Passwords do not match"
        else if (!document.getElementById("form2Example3g").checked)
            return "Please agree to terms and privacy"
        else if (isRobot)
            return "Please verify the captcha"
        else
            return "ok"
    }

    const register = (e) => {
        e.preventDefault()
        const sec = validate(e)
        if (sec === "ok") {
            axios.post("https://crossw-server.herokuapp.com/signup", {
                username: username,
                user: user,
                email: email,
                password: password
            }).then((response) => {
                var msg = response.data.message
                if(msg === "ok"){
                    setMessage("Account Created Successfully !")
                    document.getElementById("signLink").innerHTML = "Click here to Sign in"
                    setIsSuccess(true)
                    setSuccess(true)
                    document.getElementById("signupForm").reset()
                }
                else{
                    setMessage(msg)
                    setIsSuccess(false)
                    setSuccess(true)
                }
            }).catch((err) => {
                console.log(err)
            });
        }
        else {
            setMessage(sec)
            setIsSuccess(false)
            setSuccess(true)
        }
    }

  
    const toggleBot = () => {
        isRobot ? setIsRobot(false):setIsRobot(true)
    }
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated) {
            window.location.pathname = "/dashboard";
        }
        axios.get("https://crossw-server.herokuapp.com/signin").then((response) => {
            if (response.data.loggedIn === true) {
            }
        });
    }, []);

    return (
        <section className="vh-100" >
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="">
                                <div className="card-body p-5">
                                    <h2 className="text-center mb-5">Create an account</h2>

                                    <form>

                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example1cg6" onChange={(e) => { setUser(e.target.value) }} placeholder="Name" className="form-control form-control-lg" required />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example1cg" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" className="form-control form-control-lg" required />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example3cg" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} className="form-control form-control-lg" required />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4cg" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} className="form-control form-control-lg" required />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4cdg" placeholder="Confirm Password" onChange={(e) => { setConfPassword(e.target.value) }} className="form-control form-control-lg" required />
                                        </div>

                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <input
                                                className="form-check-input me-2"
                                                type="checkbox"
                                                value=""
                                                id="form2Example3g"
                                            />
                                            <label className="form-check-label" htmlFor="form2Example3g">
                                                I agree all statements in <Link to="/" className="text-body"><u>Terms of service</u></Link>
                                            </label>
                                        </div>
                                        <div className="form-outline d-flex justify-content-center mb-4">
                                            <Recaptcha
                                                sitekey="6Lc2rOMcAAAAADZMnatG2s4hlU_gMCNbkEZozThP"
                                                render="explicit"
                                                verifyCallback={toggleBot}
                                                expiredCallback={toggleBot}
                                                onloadCallback={()=>{}}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="button" onClick={register} className="btn btn-success btn-block btn-lg gradient-custom-4 ">Register</button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/signin" className="fw-bold text-body"><u>Login here</u></Link></p>

                                    </form>
                                    {success ? <>
                                        <div id="alert" className={`mt-4 text-center alert ${isSuccess ? "alert-success" : "alert-danger"}`} role="alert">
                                            {message} <Link to="/signin" id="signLink" className="alert-link"></Link>
                                        </div>
                                    </> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}