import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router'
import { DrawCrossWord } from './drawCrossword/draw';
import "./CSS/style.css";



import { Modal } from 'bootstrap'
import { useTimer } from "react-timer-hook";
import { Link } from 'react-router-dom';




export default function ChallengeView() {
    const { id } = useParams();

    const [solved, setsolved] = useState(false)
    
    const expiryTimestamp = new Date()
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 30);

    const {
        seconds,
        minutes,
        hours,
        pause
      } = useTimer({ expiryTimestamp, onExpire: () => onExp() });
      const hourTime = hours < 10 ? `0${hours}` : `${hours}`;
      const secondTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
      const minuteTime = minutes < 10 ? `0${minutes}` : `${minutes}`;

    

    const onExp = () => {
        var FailedModal = new Modal(document.getElementById('FailedModal'))
        FailedModal.show();

    }

    const onSolved = () => {
        setsolved(true);
        pause()

        var myModal = new Modal(document.getElementById('solvedModal'))
        myModal.toggle()
    }

    const generateView = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + `/getCrossword`, {
            params: {
                id: id
            }
        }).then(res => {
            console.log(res.data)
            DrawCrossWord(res.data.data, false, onSolved);
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        generateView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>

            {!solved ? 
                <div style={{ textAlign: "center" }}>
                <h1>Time Elapsed</h1>
                <div style={{ fontSize: "100px" }}>
                <span>{hourTime}</span>:<span>{minuteTime}</span>:
                <span>{secondTime}</span>
                </div>
                </div>
            : null}


            <div class="modal fade" id="solvedModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Congratulations! </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    You have finished the puzzle with {hourTime} : {minuteTime} : {secondTime} time left!
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="FailedModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Task Failed Successfully</h5>
                        </div>
                        <div class="modal-body">
                            <div className="failed_img">
                                <img src='https://miro.medium.com/max/1274/1*ON_d7DWgW8g8uu3EBntfNw.png' /> 
                            </div>
                        </div>
                        <div class="modal-footer">
                            <Link type="button" to="/crossword" className="btn btn-primary btn-lg px-4 me-md-2">Home</Link>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="card shadow rounded-3">
                    {/* <div className="card-header">
                    </div> */}
                    <div className="card-body">
                        <div id="crswrd" className="crossword"> </div>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <button onClick={() => { window.print(); }} className="btn btn-outline-info mx-1 " type="button">Print</button>
                    </div>
                </div>
            </div>
        </>
    )
}