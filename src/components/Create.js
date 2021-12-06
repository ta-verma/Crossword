import React, { useEffect, useState } from 'react'
import { DrawCrossWord } from './drawCrossword/draw'
import "./CSS/style.css";
import axios from 'axios';

export default function Create() {

    const [wordList, setWordList] = useState([]);
    const [wordBank, setWordBank] = useState([]);

    const generate = () => {
        axios.post("https://crossw-server.herokuapp.com/generate", {
            wordList: wordBank
        }).then((response) => {
            if (response.data.result) {
                DrawCrossWord(response.data.result)
                document.getElementById("canavas").innerHTML = ""
                // document.getElementById("u_table").style.height = "530px"
                document.getElementById("cid").style.display = "none"
            }
            else {
                document.getElementById("cid").style.display = "block"
                // document.getElementById("u_table").style.height = "450px"
                document.getElementById("canavas").innerHTML = "Enter more words"
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateHooks = async (id, word, clue) => {
        setWordBank([...wordBank, [word, clue]])
        setWordList([...wordList, { id, word, clue }])
        return true
    }

    const updateWordList = async (e) => {
        e.preventDefault();
        var word = document.getElementById("word").value;
        var clue = document.getElementById("clue").value;
        if (word.length > 0 && clue.length > 0) {
            var id = wordList.length + 1;
            updateHooks(id, word, clue).then((res) => {
                if (res) {
                    generate();
                }
            })
            document.getElementById("word").value = '';
            document.getElementById("clue").value = '';
        }
        else {
            alert("Please enter word and clue")
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        generate();
    })


    return (
        <div className="my-3 mx-3">
            <div className="row vh-50">
                <div className="col-md-6 ">
                    <section className="vh-100">
                        <div className="row d-flex justify-content-center py-3 my-1 ">
                            <div className="col">
                                <div style={{ minHeight: "86vh" }} className="card shadow rounded-3">
                                    <div className="card-body py-4">
                                        <h4 className="text-center my-3 pb-3">Enter Words and Clues</h4>
                                        <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                            <div className="col-5">
                                                <input className="form-control" type="text" id="word" placeholder="word" />
                                            </div>
                                            <div className="col-5">
                                                <input className="form-control" type="text" id="clue" placeholder="clue" />
                                            </div>
                                            <div className="col-2">
                                                <button type="submit" onClick={updateWordList} className="btn btn-primary">Add</button>
                                                {wordBank.length > 0 ?
                                                    <>
                                                        <button onClick={generate} className="btn btn-outline-primary mx-3 " type="button">Next</button>
                                                        <button onClick={() => { window.print() }} className="btn btn-outline-info mx-1 " type="button">Print</button>
                                                    </> :
                                                    null
                                                }
                                            </div>
                                        </form>
                                        <div id="cid" style={{ display: "none" }}>
                                            <p id="canavas" className="alert alert-secondary text-center" role="alert"> </p>
                                        </div>
                                        <div className="">
                                            {wordList.length > 0 ?
                                                <div style={{ maxHeight: "54vh" }} className=" table-responsive" id="u_table">
                                                    <table className="table">
                                                        <thead className=" sticky-top bg-white ">
                                                            <tr>
                                                                <th scope="col">No.</th>
                                                                <th scope="col">Word</th>
                                                                <th scope="col">Clue</th>
                                                                <th scope="col">Actions</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody >
                                                            {wordList.map((word, index) => {
                                                                return (
                                                                    <tr key={index + 1}>
                                                                        <th scope="row">{index + 1}</th>
                                                                        <td>{word.word}</td>
                                                                        <td>{word.clue}</td>
                                                                        <td>
                                                                            <button className="btn btn-outline-danger" onClick={() => {
                                                                                setWordList(wordList.filter((w) => w.id !== word.id))
                                                                                setWordBank(wordBank.filter((w) => w[0] !== word.word))
                                                                                generate()
                                                                            }}>Delete</button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : null}
                                        </div >
                                        {wordList.length > 0 ? <div className="row justify-content-center align-items-center">
                                            <div className="col-md-6">
                                                <button className="btn btn-outline-danger mt-4   px-5" onClick={() => {
                                                    setWordList([])
                                                    setWordBank([])
                                                    document.getElementById("cid").style.display = "none"
                                                }}>Clear</button>
                                            </div>
                                        </div> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-md-6">
                    <section className="vh-100">
                        <div className="row d-flex justify-content-center py-3 my-1 ">
                            <div className="col">
                                <div style={{ minHeight: "86vh" }} className="card shadow rounded-3">
                                    <div className="card-body my-2 ">
                                        <div style={{ maxHeight: "78vh", overflowY: "auto" }} className="row justify-content-center  align-items-center">
                                            {
                                                wordBank.length > 0 ?
                                                    <div id="crswrd" className="crossword"> </div>
                                                    :
                                                    <div className=" text-center">
                                                        <h1>No Words Entered</h1>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

