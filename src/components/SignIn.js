import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Recaptcha from 'react-recaptcha'
import GoogleLogin from 'react-google-login'
// import FacebookLogin from 'react-facebook-login';


export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [isRobot, setIsRobot] = useState(true)

    axios.defaults.withCredentials = true;

    const login = (e) => {
        e.preventDefault()
        if (username !== "" && password !== "") {
            if (!isRobot) {
                axios.post(process.env.REACT_APP_SERVER_URL + "/signin", {
                    username: username,
                    password: password
                }).then((response) => {
                    if (response.data.message) {
                        console.log(response.data.message);
                        setSuccess(true)
                        setMessage(response.data.message)
                    } else {
                        localStorage.setItem("isAuthenticated", "true");
                        window.location.pathname = "/dashboard";
                    }
                });
            }
            else {
                setSuccess(true)
                setMessage("please verify the captcha")
            }
        }
        else {
            setSuccess(true)
            setMessage("username/password can't be empty")
        }
    }
    const toggleBot = () => {
        if (isRobot)
            setIsRobot(false)
        else
            setIsRobot(true)
    }

    const responseGoogle = (res) => {
        axios.post(process.env.REACT_APP_SERVER_URL + "/oauthsignup", {
            id: res.profileObj['googleId'],
            name: res.profileObj['name'],
            email: res.profileObj['email'],
            oauth: "google",
            object: JSON.stringify(res)
        }).then((response) => {
            localStorage.setItem("isAuthenticated", "true");
            window.location.pathname = "/dashboard"
        })
    }
    const responseFailGoogle = (res) => {

        if (res['error'] === "popup_closed_by_user") {
            setSuccess(true)
            setMessage("Sign in attempt failed !")
        }
    }
    // const responseFacebook = (res) => {
    //     axios.post(process.env.REACT_APP_SERVER_URL + "/oauthsignup", {
    //         id: res['id'],
    //         name: res['name'],
    //         email: res['email'],
    //         oauth: "facebook",
    //         object: JSON.stringify(res)
    //     }).then((response) => {
    //         localStorage.setItem("isAuthenticated", "true");
    //         window.location.pathname = "/dashboard"
    //     })
    // }


    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated) {
            window.location.pathname = "/dashboard";
        }
        axios.get(process.env.REACT_APP_SERVER_URL + "/signin").then((response) => {
            if (response.data.loggedIn === true) {
                // window.location.pathname = "/dashboard";
                console.log(response.data)
            }
        });
    }, []);

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">

                <div className="row d-flex align-items-center justify-content-center h-100">

                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h3 className="py-4">  Sign In to you Account</h3>
                        <form>
                            <div className="d-flex justify-content-center" >
                                {/* <span className="col-md-7 col-lg-6 col-xl-5 "> */}
                                <GoogleLogin
                                    clientId="423957503910-f9jtmoks9tlkusbi3gurkbgp9ul87gmv.apps.googleusercontent.com"
                                    onSuccess={responseGoogle}
                                    onFailure={responseFailGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    buttonText="Sign In with Google"
                                />
                                {/* </span> */}
                                {/* <span className="col-md-7 col-lg-5 col-xl-5 ">
                                    <FacebookLogin
                                        appId="1052783725543907"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        callback={responseFacebook}
                                        cssClass="btnFacebook"
                                        icon={<i className="fa fa-facebook">
                                        </i>}
                                        textButton="&nbsp;&nbsp;Sign In with Facebook"
                                    />
                                </span> */}
                            </div>


                            <div className="d-flex justify-content-center align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>


                            {/* <!-- Email input --> */}
                            <div className="form-outline mb-4">
                                <input type="email" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} id="form1Example13" className="form-control form-control-lg" />

                            </div>

                            {/* <!-- Password input --> */}
                            <div className="form-outline mb-4">
                                <input type="password" id="form1Example23" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" className="form-control form-control-lg" />
                            </div>
                            {success ? <>
                                <div id="alert" className="mt-4 text-center alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </> : <></>}
                            <div className="form-outline d-flex justify-content-center mb-4">
                                <Recaptcha
                                    sitekey="6LedRs0dAAAAAJdDr6jqIYso77b2AYjBe1jIm250"
                                    render="explicit"
                                    verifyCallback={toggleBot}
                                    expiredCallback={toggleBot}
                                // onloadCallback={callThis}
                                />
                            </div>
                            <div className="d-flex flex-row-reverse mb-4">
                                <a href="#!">Forgot password?</a>
                            </div>

                            {/* <!-- Submit button --> */}
                            <div className="d-flex justify-content-center ">
                                <button type="submit" onClick={login} className="btn btn-primary btn-lg btn-block">Sign in</button>
                            </div>



                            <div className="d-flex justify-content-center my-3">
                                <Link to="/signup" className="link-dark">You don&#x27;t have an account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}