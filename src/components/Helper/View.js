import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router'
import { DrawCrossWord } from '../DrawCrossword/Draw';
import "../CSS/style.css";
import React from 'react';
import loaderimg from '../../img/loader.svg'

export default function View() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = React.useState(true);

    const generateView = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + `/getCrossword`, {
            params: {
                id: id
            }
        }).then(res => {
            // console.log(res.data)
            DrawCrossWord(res.data.data);
            setIsLoading(false);
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        generateView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])

    return (
        <div className="container">
            {isLoading ? <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}><img src={loaderimg} alt="loader" /></div> :
                <div className="card shadow rounded-3">
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
