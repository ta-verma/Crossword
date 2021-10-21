import React, { useState } from 'react'
import { DrawCrossWord } from './drawCrossword/draw'
import jsPDF from "jspdf";
export default function Generate() {
    const [data, setdata] = useState("")
    // const [wordList, setWordList] = useState([])

    const generate = () => {
        function csvToArray(csv) {
            var rows = csv.split("\n");

            return rows.map(function (row) {
                return row.split(",");
            });
        }
        var wordList = csvToArray(data)
        // setWordList(wordList)
        // var result = Crossword(wordList)
        DrawCrossWord(wordList)

    }

    const generateRandom = () => {
        DrawCrossWord()
    }
    let generatePDF = () => {
        var doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector(".crossword"), {
            callback: function (pdf) {
                pdf.save("mycross.pdf");
            }
        })
    }
    return (
        <>
            <div class="container" style={{ paddingTop: "300px", paddingBottom: "300px" }}>
                <label htmlFor="txtarea" class="mx-auto"> Words And Clue</label>
                <textarea class="form-control" onChange={(e) => { setdata(e.target.value) }} placeholder="" rows="10" cols="50" id="txtarea"></textarea>
                <button onClick={generate} class="btn btn-outline-primary mt-5 mx-auto" type="button">
                    Generate
                </button>
                <button onClick={generateRandom} class="btn btn-outline-primary mx-5 mt-5" type="button">
                    Generate Random
                </button>
                <button onClick={generatePDF} class="btn btn-outline-primary mx-5 mt-5" type="button">
                    save as PDF
                </button>
                <div>
                    <div class="crossword"> </div>
                </div>
            </div>
        </>
    )

}