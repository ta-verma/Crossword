import React from 'react'

export default function Contact() {
    return (
        <div>

            <div className="container py-4">
                <form id="contactForm" style={{ margin: "150px" }}>
                    <h3 class="pb-3">Contact Us</h3>
                    <div className="mb-3">
                        <input className="form-control" id="name" type="text" placeholder="Name" data-sb-validations="required" />
                        <div className="invalid-feedback" data-sb-feedback="name:required">Name is required.</div>
                    </div>
                    <div className="mb-3">
                        <input className="form-control" id="emailAddress" type="email" placeholder="Email Address" data-sb-validations="required, email" />
                        <div className="invalid-feedback" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                        <div className="invalid-feedback" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" id="message" type="text" placeholder="Message" style={{ height: "10rem" }} data-sb-validations="required"></textarea>
                        <div className="invalid-feedback" data-sb-feedback="message:required">Message is required.</div>
                    </div>
                    <div className="d-none" id="submitSuccessMessage">
                        <div className="text-center mb-3">Form submission successful!</div>
                    </div>
                    <div className="d-none" id="submitErrorMessage">
                        <div className="text-center text-danger mb-3">Error sending message!</div>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary btn-lg" type="submit">Submit</button>
                    </div>

                </form>

            </div>
        </div>
    )
}
