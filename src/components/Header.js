// import axios from 'axios';
import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios';

export default function Header(props) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const logout = () => {
       
        axios.defaults.withCredentials = true
        axios.get(process.env.REACT_APP_SERVER_URL + "/logout").then((response) => {
            if (response.data.loggedIn === false){
            localStorage.clear();
            window.location.pathname = "/"
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (

        <>
            <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><NavLink className="nav-link px-2 link-dark navbar-brand" to="/">CrossWord</NavLink></li>
                            <li><NavLink className="nav-link px-2 link-dark active" to="/">Home</NavLink></li>
                            <li><NavLink className="nav-link px-2 link-dark" to="/crossword">Generate Crossword</NavLink></li>
                            <li><NavLink className="nav-link px-2 link-dark" to="/about">About Us</NavLink></li>
                            <li><NavLink className="nav-link px-2 link-dark" to="/contact">Contact Us</NavLink></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                        </form>
                        {isAuthenticated ?
                            <>
                                <div className="dropdown text-end">
                                    <Link to="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-user"></i>
                                    </Link>
                                    <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                                        <li><NavLink className="dropdown-item" to="/dashboard">Dashboard</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/account">Account</NavLink></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><NavLink className="dropdown-item" onClick={logout} to="/">Sign Out</NavLink></li>
                                    </ul>
                                </div>
                            </>
                            :
                            <>
                                <ul className="d-flex justify-content-center nav col-12 col-lg-auto md-lg-auto mb-2 mb-md-auto mb-lg-auto sd-auto me-lg-3">
                                    <li>
                                        <NavLink className="nav-link px-2 link-dark" to="/signin">Sign In</NavLink>
                                    </li>
                                </ul>
                            </>
                        }
                    </div>
                </div>
            </header>
        </>
    )
}


