import { useEffect, useState } from 'react';
import axios from 'axios';
import { DrawCrossWord } from './drawCrossword/draw'
import "./CSS/style.css"
import { Modal } from 'bootstrap'
import { useTimer } from "react-timer-hook";
import { Link } from 'react-router-dom';
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon
  } from "react-share";


export default function Challenge() {
    axios.defaults.withCredentials = true;
    const [data, setData] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [name, setName] = useState('');
    const [userFlag, setUserFlag] = useState(false);
    const [success, setSuccess] = useState(false);
    const [solved, setsolved] = useState(false)
    const [shareid, setshareid] = useState(0)
    let datas = {};
    
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
        console.log(data)
        setUserFlag(false)
        
        axios.post(process.env.REACT_APP_SERVER_URL + "/save", {
            data: datas
        }).then((response) => {
            console.log(response.data.id)
            setshareid(response.data.id)
            
        }).catch((err) => {
            console.log(err)
        })

        var myModal = new Modal(document.getElementById('solvedModal'))
        myModal.toggle()
    }

    const generateRandom = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/generate")
            .then((response) => {
                datas = response.data.result
                setData(response.data.result)
                console.log(datas)
                DrawCrossWord(response.data.result, false, onSolved)
            }).catch((err) => {
                console.log(err)
            })
    }

    const saveToDB = () => {
        setUserFlag(false)
        axios.post(process.env.REACT_APP_SERVER_URL + "/save", {
            data: data
        }).then((response) => {
            document.getElementById("shareableLink").value = window.location.origin + "/crossword/" + response.data.id
        }).catch((err) => {
            console.log(err)
        })
    }


    const savePuzzel = () => {
        axios.post(process.env.REACT_APP_SERVER_URL + "/savePuzzle", {
            data: data,
            username: userDetails.username,
            name: name
        }).then((response) => {
            console.log(response.data)
            setSuccess(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    const savePuzzelUtil = () => {
        setUserFlag(true)
    }

    useEffect(() => {

        document.getElementById('crswrd').innerHTML = ''
        window.scrollTo(0, 0);
        generateRandom()
        axios.get(process.env.REACT_APP_SERVER_URL + "/signin").then((response) => {
            console.log(response.data);
            if (response.data.loggedIn === true) {
                setIsLogin(true);
                setUserDetails(response.data.user[0])
            }
            else {
                console.log("not logged in")
            }
        });
    }, [])


    return (
        
        <div>
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
                        <button type="button" class="btn btn-primary">
                            <FacebookShareButton
                                url={window.location.origin + "/crosswordchg/" + shareid}
                                quote="I have completed this crossword challenge!"
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <WhatsappShareButton
                                url={window.location.origin + "/crosswordchg/" + shareid}
                                title="I have completed this crossword challenge!"
                                separator=":: "
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </button>
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
                {/* bootstrap modal to generate shareable link */}
                <div className="modal fade" id="shareModal" tabIndex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="shareModalLabel">{userFlag ? <>Enter Crossword Name</> : <>Shareable Link</>}</h5>
                            </div>
                            <div className="modal-body">
                                <input type="text" onChange={(e) => { setName(e.target.value) }} id="shareableLink" className="form-control" />
                            </div>
                            <div className="modal-footer" id="modal-footer">
                                {userFlag ? <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={savePuzzel}>Save</button> : null}
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow rounded-3">
                    {/* <div className="card-header">
                </div> */}
                    <div className="card-body">
                        <div id="crswrd" className="crossword"> </div>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <button onClick={() => { window.print(); }} className="btn btn-outline-info mx-1 " type="button">Print</button>
                        <button type="button" onClick={saveToDB} data-bs-toggle="modal" data-bs-target="#shareModal" className="btn btn-outline-info mx-1 ">Share</button>
                        {isLogin ? <button type="button" onClick={savePuzzelUtil} data-bs-toggle="modal" data-bs-target="#shareModal" className="btn btn-outline-info mx-1 ">Save</button> : null}
                    </div>
                </div>
                {success ? <div><div className="alert alert-info text-center" role="alert" id="s-alert">Saved Successfully!</div></div> : null}
            </div>
        </div>
    )
}