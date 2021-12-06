import { useEffect, useState } from 'react';
import axios from 'axios';
import { DrawCrossWord } from './drawCrossword/draw'
import "./CSS/style.css"

export default function Random() {
    const [data, setData] = useState({});
    const generateRandom = () => {
        axios.get("https://crossw-server.herokuapp.com/generate")
            .then((response) => {
                // console.log(response.data.result)
                setData(response.data.result)
                DrawCrossWord(response.data.result)
            }).catch((err) => {
                console.log(err)
            })
    }

    const saveToDB = () => {
        axios.post("https://crossw-server.herokuapp.com/save", {
            data: data
        }).then((response) => {
            document.getElementById("shareableLink").value = window.location.origin + "/crossword/" + response.data.id
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        document.getElementById('crswrd').innerHTML = ''
        window.scrollTo(0, 0);
        generateRandom()
        // console.log(data)
    }, [])

    return (
        <div>
            <div className="container">
                {/* bootstrap modal to generate shareable link */}
                <div className="modal fade" id="shareModal" tabIndex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="shareModalLabel">Shareable Link</h5>
                            </div>
                            <div className="modal-body">
                                <input type="text" id="shareableLink" className="form-control" />
                            </div>
                            <div className="modal-footer">
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
                    </div>
                </div>
            </div>
        </div>
    )
}