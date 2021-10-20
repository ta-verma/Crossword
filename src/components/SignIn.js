import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    axios.defaults.withCredentials = true;

    const login = (e) => {
        e.preventDefault()
        axioshttps:"//crossw-server.herokuapp.com/signin", {
            username: username,
            password: password
        }).then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
                // console.log(response)
                // setLoginStatus(response.data[0].USERNAME);
                localStorage.setItem("isAuthenticated", "true");
                window.location.pathname = "/dashboard";
            }
        });
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated) {
            window.location.pathname = "/dashboard";
        }
        axios.get("http://localhost:3001/signin").then((response) => {
            if (response.data.loggedIn === true) {
                // setLoginStatus(true)
            }
        });
    }, []);

    return (
        <section className="vh-100">
            <div className="container py-5 h-100">

                <div className="row d-flex align-items-center justify-content-center h-100">
                    {/* <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image"/>
            </div> */}

                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h3 className="py-4">  Sign In to you Account</h3>
                        <form>
                            {/* <!-- Email input --> */}
                            <div className="form-outline mb-4">
                                <input type="email" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} id="form1Example13" className="form-control form-control-lg" />

                            </div>

                            {/* <!-- Password input --> */}
                            <div className="form-outline mb-4">
                                <input type="password" id="form1Example23" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" className="form-control form-control-lg" />
                            </div>

                            <div className="d-flex flex-row-reverse mb-4">
                                <a href="#!">Forgot password?</a>
                            </div>

                            {/* <!-- Submit button --> */}
                            <div className="d-flex justify-content-center ">
                                <button type="submit" onClick={login}  className="btn btn-primary btn-lg btn-block">Sign in</button>
                            </div>
                            <div className="d-flex justify-content-center align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>


                            <div className="d-flex justify-content-center" >
                                <a className="btn btn-outline-dark" href="/users/googleauth" role="button" style={{ textTransform: "none" }}>
                                    <img width="20px" alt="Google sign-in" className="mx-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                                    Login with Google
                                </a>
                            </div>
                            <div className="d-flex justify-content-center my-3">
                            <Link to="/signup" class="link-dark">You don&#x27;t have an account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        // <div className="container py-24 m-16 mx-auto self-center flex flex-col justify-center items-center">
        //     <div className="flex flex-col w-full max-w-md px-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        //         <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
        //             Login To Your Account
        //         </div>
        //         <div className="flex gap-4 item-center">
        //             <button type="button" className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        //                 <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        //                     <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z">
        //                     </path>
        //                 </svg>
        //                 Facebook
        //             </button>
        //             <button type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
        //                 <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        //                     <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
        //                     </path>
        //                 </svg>
        //                 Google
        //             </button>
        //         </div>
        //         <div className="mt-8">
        //             <form className="space-y-5">
        //                 <div>
        //                     <input type="username" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-500" />
        //                 </div>

        //                 <div>
        //                     <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-500" />
        //                 </div>

        //                 <div className="flex items-center mb-6 -mt-4">
        //                     <div className="flex ml-auto">
        //                         <a href="/" className="inline-flex text-xs text-gray-700 sm:text-sm dark:text-gray-100 hover:text-gray-900 dark:hover:text-white">
        //                             Forgot Your Password?
        //                         </a>
        //                     </div>
        //                 </div>

        //                 <div>
        //                     <button onClick={login} className="block w-full bg-blue-500 hover:bg-blue-700 p-4 rounded text-white hover:text-while transition duration-200">Login</button>
        //                 </div>
        //             </form>
        //         </div>
        //         <div className="flex items-center justify-center my-6">
        //             <Link to="/signup" className="inline-flex items-center text-xs  text-center text-gray-700 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white">
        //                 <span className="ml-2">
        //                     You don&#x27;t have an account?
        //                 </span>
        //             </Link>
        //         </div>
        //     </div>
        // </div>
    )
}
