import React, { useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom';

export default function Dashboard() {
    axios.defaults.withCredentials = true;
    const [data, setData] = React.useState([]);
    const [dataFlag, setDataFlag] = React.useState(false);

    const loadData = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/signin").then((response) => {
            if (response.data.loggedIn === true) {
                axios.post(process.env.REACT_APP_SERVER_URL + "/getUserData", {
                    username: response.data.user[0].username
                }).then((response) => {
                    if (response.data.message === "data") {
                        setData(response.data.data);
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

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='container'>
            {/* Bootstrap Card */}
            <div className="card min-vh-100">
                <div className="card-header">
                    <h5 className="card-title">Dashboard</h5>
                </div>
                <div className="card-body">
                    {dataFlag ?
                        <div style={{ maxHeight: "1000px" }} className="table-responsive">
                            <table className="table table-striped">
                                <thead className=" sticky-top bg-white shadow">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Crossword Name</th>
                                        <th scope="col">Privacy</th>
                                        {/* <th scope="col">Crossword</th> */}
                                        <th scope="col">Action</th>
                                        <th scope="col">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data ? <>{data.map((item, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                <tr key={index + 1}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item.name}</td>
                                                    <td><button style={{ border: "0", backgroundColor:"transparent" }} onClick={(e) => {
                                                        e.target.disabled = true;


                                                        // console.log(item.privacy)
                                                        axios.post(process.env.REACT_APP_SERVER_URL + "/togglePrivacy", {
                                                            id: item.id,
                                                            privacy: item.privacy === "Public" ? "Private" : "Public"
                                                        }).then((response) => {
                                                            // console.log(response.data)
                                                            if (response.data.message === "changed") {
                                                                loadData();
                                                                e.target.disabled = false;
                                                            }
                                                        }).catch((error) => {
                                                            console.log(error)
                                                        })
                                                    }}>{item.privacy === "Private" ? <span className="badge bg-danger p-2" >Private</span> :
                                                        <span className="badge bg-success p-2" >Public</span>}</button></td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => {
                                                            axios.post(process.env.REACT_APP_SERVER_URL + "/deleteCrossword", {
                                                                id: item.id
                                                            }).then((response) => {
                                                                console.log(response.data)
                                                                loadData();
                                                                // document.location.reload(true);
                                                            }).catch((error) => {
                                                                console.log(error)
                                                            })
                                                        }} >Delete</button>
                                                    </td>
                                                    <td>
                                                        {/* <Link to={`${item.username}/${item.id}`}>View</Link> */}
                                                        <a target="_blank" href={`${item.username}/${item.id}`} rel="noreferrer">View</a>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    })}</> : null}
                                </tbody>
                            </table>
                        </div> : <> <div><h1>No data found</h1></div></>}
                </div>
            </div>
        </div>
    )
}
