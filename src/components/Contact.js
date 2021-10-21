import React, { useState } from 'react'
import axios from 'axios'
import Recaptcha from 'react-recaptcha'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(true)
    const [result, setResult] = useState('')
    const [isRobot, setIsRobot] = useState(true)

    const submitFeedback = (e) => {
        e.preventDefault()
        if (name !== "" && email !== "" && message !== "" && isRobot === false) {
            axios.post("https://crossw-server.herokuapp.com/contact", {
                name: name,
                email: email,
                message: message,
            }).then((response) => {
                var res = response.data.message
                if (res === "ok") {
                    setResult("Feedback Submitted Successfully.")
                    setSuccess(true)
                    setIsSuccess(true)
                    document.getElementById("contactForm").reset()
                }
                else {
                    setResult("Something went wrong.")
                    setSuccess(true)
                    setIsSuccess(false)
                }

            })
        }
        else {
            setResult("All Fields are mandotary.")
            setSuccess(true)
            setIsSuccess(false)
        }
       

    }

    const toggleBot = () => {
        if (isRobot)
            setIsRobot(false)
        else
            setIsRobot(true)
    }

    return (
        <div>

            <div className="container" style={{ marginTop: "10%", marginBottom: "10%" }}>
                <form id="contactForm" className="my-4 mx-xl-auto">
                    <h3 className="pb-3">Contact Us</h3>
                    <div className="mb-3">
                        <input className="form-control" id="name" onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Name" data-sb-validations="required" />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" id="emailAddress" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email Address" data-sb-validations="required, email" />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" id="message" type="text" placeholder="Message" onChange={(e) => { setMessage(e.target.value) }} style={{ height: "10rem" }} data-sb-validations="required"></textarea>
                    </div>
                    <div className="form-outline d-flex justify-content-center mb-4">
                        <Recaptcha
                            sitekey="6Lc2rOMcAAAAADZMnatG2s4hlU_gMCNbkEZozThP"
                            render="explicit"
                            verifyCallback={toggleBot}
                            expiredCallback={toggleBot}
                            onloadCallback={() => { }}
                        />
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary btn-lg" type="submit" onClick={submitFeedback} >Submit</button>
                    </div>
                    {success ? <>
                        <div id="alert" className={`mt-4 text-center alert ${isSuccess ? "alert-success" : "alert-danger"}`} role="alert">
                            {result}
                        </div>
                    </> : <></>}
                </form>

            </div>
        </div>
    )
}
