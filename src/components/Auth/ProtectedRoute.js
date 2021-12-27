import axios from "axios";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import loaderimg from '../../img/loader.svg'

function ProtectedRoute({ component: Component, ...restOfProps }) {
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/signin");
            setIsAuthenticated(response.data.loggedIn);
            setIsLoading(false);
            setSuccess(true);
        };
        fetchData();
    }, []);


    return (
        <>
            {isLoading && <div className="d-flex justify-content-center align-items-center" style={{height: '70vh'}}><img src={loaderimg} alt="loader"/ ></div>}
            {success && <Route {...restOfProps} render={(props) => isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />} />}
        </>
    );
}

export default ProtectedRoute;