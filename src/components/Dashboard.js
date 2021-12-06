import React, { useEffect } from 'react'
import axios from 'axios'

export default function Dashboard() {
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get("https://crossw-server.herokuapp.com/signin").then((response) => {
            console.log(response)
            if (response.data.loggedIn === true) {
                // window.location.pathname = "/dashboard";
                console.log(response.data)
            }
        });
    }, [])

    return (
        <div>
            <h1>This is Dashboard </h1>
        </div>
    )
}
