import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import homeimg from '../../img/home.jpg';
import axios from 'axios';
export default function Landing() {

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/signin").then((response) => {

            console.log(response.data);
            if (response.data.loggedIn === true) {
                // window.location.pathname = "/dashboard";
                console.log(response.data)
            }
            else {
                console.log("not logged in")
            }
        });
    }, []);

    return (
        <div>
            <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src={homeimg} className="d-block mx-lg-auto  img-fluid" alt="" width="700" height="500" loading="lazy" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">Crossword</h1>
                        <p className="lead">crossword is a word puzzle that usually takes the form of a square or a rectangular grid of white and black-shaded squares. The game's goal is to fill the white squares with letters, forming words or phrases, by solving clues, which lead to the answers.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link type="button" to="/crossword" className="btn btn-primary btn-lg px-4 me-md-2">Create</Link>
                        </div>
                    </div>
                </div>
            </div>

            <section className="">
                <div>
                    <div className=" p-5">
                        <div className="text-center mb-4 pb-2">
                            <img src="img/puzzle.png" alt="puzzle" width="70" height="70" />
                        </div>
                        <figure className="text-center mb-0">
                            <blockquote className="blockquote">
                                <p className="pb-3">
                                    <span className="lead font-italic">The nice thing about doing A crossword puzzle is, you know there is a solution.</span>
                                </p>
                            </blockquote>
                            <figcaption className="blockquote-footer mb-0">
                                Stephen Sondheim
                            </figcaption>
                        </figure>

                    </div>
                </div>
            </section>
        </div>
    )
}


