import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { DrawCrossWord } from '../DrawCrossword/Draw';
import "../CSS/style.css";
import loaderimg from '../../img/loader.svg'

export default function UserCrosswordView() {
    axios.defaults.withCredentials = true;
    const [isLoading, setIsLoading] = React.useState(true);

    const { user, id } = useParams();
    useEffect(() => {
        axios.post(process.env.REACT_APP_SERVER_URL + "/getUserData", {
            username: user
        }).then((response) => {
            if (response.data.message === "data") {
                const data = response.data.data;
                data.forEach(element => {
                    if ((element.id).toString() === id && element.privacy === "Public") {
                        DrawCrossWord(JSON.parse(element.crossword));
                        setIsLoading(false);
                    }
                    else if ((element.id).toString() === id && element.privacy === "Private") {
                        axios.get(process.env.REACT_APP_SERVER_URL + "/signin").then((response) => {
                            if (response.data.loggedIn === true) {
                                if (response.data.user[0].username === user) {
                                    DrawCrossWord(JSON.parse(element.crossword));
                                    setIsLoading(false);
                                }
                                else {
                                    document.getElementById("main").innerHTML = `<div style=" position: relative;
                                top: 400px;" class="min-vh-100 text-center"><h1>Unauthorized Access</h1></div>`;
                                }
                            }
                            else {
                                document.getElementById("main").innerHTML = `<div style=" position: relative;
                                top: 400px;" class="min-vh-100 text-center"><h1>Unauthorized Access</h1></div>`;
                            }
                        });
                    }
                })
            }
            else {
                console.log(response.data.message);
            }
        }).catch((error) => {
            console.log(error)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])
    return (

        <div className="container" id="main">
            {isLoading ? <div className="d-flex justify-content-center align-items-center" style={{height: '70vh'}}><img src={loaderimg} alt="loader"/ ></div> :
                <div className="card shadow rounded-3">
                    {/* <div className="card-header">
                </div> */}
                    <div className="card-body">
                        <div id="crswrd" className="crossword"> </div>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <button onClick={() => { window.print(); }} className="btn btn-outline-info mx-1 " type="button">Print</button>
                    </div>
                </div>}
        </div>
    )
}
