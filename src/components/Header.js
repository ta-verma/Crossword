import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header(props) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const logout = () => {
        localStorage.clear();
        window.location.pathname = "/"
    }
    return (

        <>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">CrossWord</NavLink>
                        {/* lg:align-left */}
                        <span className="">
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" to="/">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/generate">Generate Crossword</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/about">About Us</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                                    </li>
                                    {
                                        isAuthenticated ?
                                            <>
                                                {/* <li className="nav-item dropdown">
                                                    <NavLink className="nav-link dropdown-toggle" to="/dashboard" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        User
                                                    </NavLink>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                        <li><NavLink className="dropdown-item" to="/dashboard">Dashboard</NavLink></li>
                                                        <li><NavLink className="dropdown-item" to="/account">Account</NavLink></li>
                                                        <li><NavLink className="dropdown-item" onClick={logout} to="/">Sign Out</NavLink></li>
                                                    </ul>
                                                </li> */}
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/account">Account</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" onClick={logout} to="/">Sign Out</NavLink>
                                                </li>
                                            </> :
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/signin">Sign In</NavLink>
                                            </li>
                                    }
                                </ul>
                            </div>
                        </span>
                    </div>
                </nav>
            </div>

        </>
    )
}


