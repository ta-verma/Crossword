import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router'
import { DrawCrossWord } from './drawCrossword/draw';
import "./CSS/style.css";

export default function View() {
    const { id } = useParams();

    const generateView = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + `/getCrossword`, {
            params: {
                id: id
            }
        }).then(res => {
            console.log(res.data)
            DrawCrossWord(res.data.data);
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        generateView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
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
    )
}
