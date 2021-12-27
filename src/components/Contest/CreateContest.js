import React from 'react'
import axios from 'axios';

export default function CreateContest() {

    axios.defaults.withCredentials = true;
    const [data, setData] = React.useState([]);
    const [dataFlag, setDataFlag] = React.useState(false);
    const [puzzles, setPuzzles] = React.useState({});
    const [username, setUsername] = React.useState('');

    const loadData = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/signin").then((response) => {
            if (response.data.loggedIn === true) {
                setUsername(response.data.user[0].username);
                axios.post(process.env.REACT_APP_SERVER_URL + "/getUserData", {
                    username: response.data.user[0].username
                }).then((response) => {
                    if (response.data.message === "data") {
                        setData(response.data.data);
                        // console.log(data)
                        setDataFlag(true);
                    }
                    else {
                        setDataFlag(false);
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
        });
    }

    const createContest = () => {
        axios.post(process.env.REACT_APP_SERVER_URL + "/createContest", {
            name: document.getElementById("name").value,
            username: username,
            description: document.getElementById("description").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
        }).then((response) => {
            if (response.data.message === "ok") {
                axios.post(process.env.REACT_APP_SERVER_URL + "/saveContestPuzzle",{
                    contest_name: document.getElementById("name").value,
                    puzzle_name: puzzles.puzzle_name,

                })
            }
            else {
                alert("Error creating contest");
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    React.useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <div className='container py-5'>
                <h3>Create Contest</h3>
                <form className='mb-3'>
                    <div className="form-group row mt-3">
                        <label htmlFor="inputtext1" className="col-sm-2 col-form-label">Contest Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputtext1" placeholder="Contest Name" />
                        </div>
                    </div>
                    <div className="form-group row mt-3">
                        <label htmlFor="textarea1" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" id="textarea1" placeholder='Type here...' rows="3"></textarea>
                        </div>
                    </div>
                    <div className="form-group row mt-3">
                        <label htmlFor="starttime" className="col-sm-2 col-form-label">Start Time</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="starttime" placeholder="Start Time" onFocus={e => e.target.type = 'datetime-local'}
                                onBlur={e => e.target.type = 'text'} />
                        </div>
                    </div>
                    <div className="form-group row mt-3">
                        <label htmlFor="endtime" className="col-sm-2 col-form-label">End Time</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="endtime" placeholder="End Time" onFocus={e => e.target.type = 'datetime-local'}
                                onBlur={e => e.target.type = 'text'} />
                        </div>
                    </div>
                    <div className="form-group row mt-5">
                        <label htmlFor="addpuzzle" className="col-sm-2 col-form-label">Add Puzzle</label>
                        <div className="col-sm-6">
                            <select id="selectinputState" className="form-control" defaultValue='Choose Puzzle...'>
                                {dataFlag && data.length ? data.map((puzzle, index) => {
                                    return (
                                        <option key={index}>{puzzle.name}</option>
                                    )
                                }
                                ) : <option>Choose Puzzle...</option>}
                            </select>
                        </div>
                        <div className="col-sm-1">
                            <button type="button" className="btn btn-outline-info" onClick={
                                () => {
                                    console.log(puzzles)
                                    let selectedPuzzle = document.getElementById('selectinputState').value;
                                    if (selectedPuzzle !== 'Choose Puzzle...') {
                                        if (puzzles.hasOwnProperty(selectedPuzzle)) {
                                            alert('Puzzle already added');
                                        }
                                        else {
                                            setPuzzles({ ...puzzles, [selectedPuzzle]: selectedPuzzle });
                                        }
                                    }
                                    else {
                                        alert('Please select a puzzle');
                                    }
                                }
                            }>Add</button>
                        </div>
                    </div>
                </form>
                {/* bootstrap responsive table */}

                <div className="d-flex justify-content-center table-responsive text-center">
                    <table className="table table-bordered  w-75 mt-5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Puzzle Name</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(puzzles).length ? Object.keys(puzzles).map((puzzle, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{puzzle}</td>
                                        <td><button type="button" className="btn btn-outline-danger" onClick={
                                            () => {
                                                let newPuzzles = { ...puzzles };
                                                delete newPuzzles[puzzle];
                                                setPuzzles(newPuzzles);
                                            }
                                        }>Remove</button></td>
                                    </tr>
                                )
                            }) : <tr><td colSpan="3">No puzzles added</td></tr>}
                        </tbody>
                    </table>
                </div>
                {/* create contest button */}
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-success w-25 mt-5" onClick={createContest}>Create Contest</button>
                </div>
            </div>
        </div>
    )
}
