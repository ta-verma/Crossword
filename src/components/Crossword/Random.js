import { useEffect, useState } from 'react';
import axios from 'axios';
import { DrawCrossWord } from '../DrawCrossword/Draw'
import "../CSS/style.css"

export default function Random() {
    axios.defaults.withCredentials = true;
    const [data, setData] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [name, setName] = useState('');
    const [userFlag, setUserFlag] = useState(false);
    const [success, setSuccess] = useState(false);


    const generateRandom = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/generate")
            .then((response) => {
                setData(response.data.result)
                DrawCrossWord(response.data.result)
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