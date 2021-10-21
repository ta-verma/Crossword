import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')

    const register = (e) => {
        e.preventDefault()
        axios.post("https://crossw-server.herokuapp.com/signup", {
            username: username,
            user: user,
            email: email,
            password: password
        }).then((response) => {
            setMessage(response.data.message)
            setSuccess(true)
            document.getElementById("signupForm").reset()
        }).catch((err) => {
            console.log(err)
        });
        // alert()
    }


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
                                            <input type="text" id="form3Example1cg6" onChange={(e) => { setUser(e.target.value) }} placeholder="Name" className="form-control form-control-lg" />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example1cg" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username" className="form-control form-control-lg" />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" id="form3Example3cg" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} className="form-control form-control-lg" />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4cg" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} className="form-control form-control-lg" />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4cdg" placeholder="Confirm Password" className="form-control form-control-lg" />
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

                                        <div className="d-flex justify-content-center">
                                            <button type="button" onClick={register} className="btn btn-success btn-block btn-lg gradient-custom-4 ">Register</button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/signin" className="fw-bold text-body"><u>Login here</u></Link></p>

                                    </form>
                                    {success ? <>
                                        <div className="mt-4 alert alert-success" role="alert">
                                            {message} <Link to="/signin" className="alert-link">Click here to Sign in</Link>
                                        </div>
                                    </> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // <div>
        //     <div className="d-flex align-items-center justify-content-center my-3">
        //         {/* <div className="bg-white p-56 rounded shadow-2x1 w-1/2"> */}
        //         <div className="d-flex d-flex-col bg-white rounded-lg dark:bg-gray-800 sm:px-6 md:px-8 lg:w-2/6">
        //             <h2 className="text-3xl font-bold mb-10 text-gray-800">Create Your Account</h2>

        //             <form id="signupForm" className="space-y-5">
        //                 <div>
        //                     <input type="text" placeholder="Name" onChange={(e) => { setUser(e.target.value) }} className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-500" />
        //                 </div>

        //                 <div>
        //                     <input type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-500" />
        //                 </div>

        //                 <div>
        //                     <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-500" />
        //                 </div>

        //                 <div>
        //                     <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-blue-500" />
        //                 </div>

        //                 <div className="flex items-center">
        //                     <input type="checkbox" id="agree" />
        //                     <label htmlFor="agree" className="ml-2 text-gray-700 text-sm">I agree to the terms and privacy.</label>
        //                 </div>

        //                 <div>
        //                     <button onClick={register} className="block w-full bg-blue-500 hover:bg-blue-700 p-4 rounded text-white hover:text-while transition duration-300">Sign Up</button>
        //                 </div>
        //             </form>
        //             {success ? <>
        //                 <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 my-5 rounded relative" role="alert">
        //                     <span className="flex justify-center items-center sm:inline">{message}</span>
        //                 </div>
        //                 <Link to="/signin" className="text-blue-700 mx-auto">Click here to Sign In</Link>
        //             </> : <></>}
        //         </div>
        //     </div>

        // </div>
    )
}
