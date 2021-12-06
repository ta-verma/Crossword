import React from 'react'
import { Link } from 'react-router-dom'
import createimg from '../img/create.jpg';
import challengeimg from '../img/challenge.png';
import generateimg from '../img/generate.png';

export default function Generate() {
    return (
        <>
            <div style={{ minHeight: "93vh" }} className="py-md-5 text-center">
                <div className="col-md-12 p-lg-15 mx-auto my-5 py-5">
                    <h1 className="display-4 font-weight-normal">Crossword Zone</h1>
                    <p className="lead font-weight-normal">The interactive puzzle maker for creating awesome, <br />custom and online puzzles <br />Create - Solve - Share </p>
                    <a className="btn btn-outline-secondary m-3" href="#work1">Create</a>
                    <a className="btn btn-outline-secondary m-3" href="#work2">Challenge</a>
                    <a className="btn btn-outline-secondary m-3" href="#work3">Generate</a>
                </div>
            </div>

            <div className="container min-vh-100 col-xxl-8 px-4 py-5" id="work1">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">Create Puzzle</h1>
                        <p className="lead">Create your own Puzzle ! With your clues and words. You can download the puzzle and Share it with others.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link type="button" to="/crossword/create" className="btn btn-primary btn-lg px-4 me-md-2">Create</Link>
                        </div>
                    </div>
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src={createimg} className="d-block mx-lg-auto  img-fluid" alt="hello" width="700" height="500" loading="lazy" />
                    </div>
                </div>
            </div>

            <div className="container min-vh-100 col-xxl-8 px-4 py-5" id="work2">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src={challengeimg} className="d-block mx-lg-auto  img-fluid" alt="" width="700" height="700" loading="lazy" />
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">Take A Challenge</h1>
                        <p className="lead">Up for a challenge? We dare you to solve a puzzle and win against the best time. Create a Score and Share it with others.</p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link type="button" to="/generate/challenge" className="btn btn-primary btn-lg px-4 me-md-2">Start</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container min-vh-100 col-xxl-8 px-4 py-5" id="work3">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold lh-1 mb-3">Create Random Puzzle</h1>
                        <p className="lead">Create a random Puzzle and share it with others. </p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <Link type="button" to="/crossword/random" className="btn btn-primary btn-lg px-4 me-md-2">Create</Link>
                        </div>
                    </div>
                    <div className="col-10 col-sm-8 col-lg-6">
                        <img src={generateimg} className="d-block mx-lg-auto  img-fluid" alt="" width="700" height="500" loading="lazy" />
                    </div>
                </div>
            </div>
        </>
    )
}