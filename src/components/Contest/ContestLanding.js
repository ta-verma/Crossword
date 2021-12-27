import React from 'react'
import contestimg from '../../img/contest.png'
import { Link } from 'react-router-dom'


export default function Contest() {
    return (
        <div>
            <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src={contestimg} className="d-block mx-lg-auto img-fluid" alt="" width="350" height="200" loading="lazy" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">Crossword Contest</h1>
                        <p className="lead">Easily create and run successful contests.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link type="button" to="/contest/create" className="btn btn-outline-primary btn-lg px-4 me-md-2">Create</Link>
                        </div>
                    </div>
                </div>
            </div>
            <section className="">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card shadow-sm ">
                                <div className="card-body">
                                    <h5 className="card-title">Live Contest</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                                    <div className="card-footer text-muted">
                                        2 days ago
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm ">
                                <div className="card-body">
                                    <h5 className="card-title">Past Contest</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                                    <div className="card-footer text-muted">
                                        2 days ago
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm ">
                                <div className="card-body">
                                    <h5 className="card-title">Upcomming Contest</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                                    <div className="card-footer text-muted">
                                        2 days ago
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
