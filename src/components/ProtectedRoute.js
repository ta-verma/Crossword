// import axios from "axios";
import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    // const [loginStatus, setLoginStatus] = useState(false)

    // useEffect(() => {
    //     axios.get("http://localhost:3001/signin").then((response) => {
    //         if (response.data[0].loggedIn === true) {
    //             setLoginStatus(true);
    //             console.log(response)
    //         }
    //     });
    // }, []);

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );
}

export default ProtectedRoute;