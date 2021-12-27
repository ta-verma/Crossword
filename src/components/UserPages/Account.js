import axios from 'axios'
import React, { useEffect } from 'react'

export default function Account() {
    const [user, setUser] = React.useState({})
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [oldPassword, setOldPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    axios.defaults.withCredentials = true
    var password_e = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    var alert1 = document.getElementById('ps-alert')
    if (alert1)
        alert1.style.display = 'none'
    if(document.getElementById('alert2'))
        document.getElementById('alert2').style.display = 'none'

    const changePassword = (e) => {
        e.preventDefault()

        if (newPassword === confirmPassword && newPassword.length > 0 && confirmPassword.match(password_e)) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/updatePassword`, {
                username: user.username,
                password: oldPassword,
                newPassword: newPassword
            }).then(res => {
                // console.log(res)
                if (res.data.message === 'ok') {
                    document.getElementById('close2').click()
                    setOldPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                    document.getElementById('exampleInputPassword1').value = ''
                    document.getElementById('exampleInputPassword2').value = ''
                    document.getElementById('exampleInputPassword4').value = ''

                    alert1.style.display = 'block'
                }
                else {
                    document.getElementById('alert2').style.display = 'block'
                    document.getElementById('alert2').innerHTML = res.data.message
                }
            }).catch(err => {
                console.log(err)
            })
        }
        else {
            document.getElementById('alert2').style.display = 'block'
            document.getElementById('alert2').innerHTML = 'Password must contain at least 1 number and 1 special character'
        }
    }

    const updateProfile = (e) => {
        e.preventDefault()
        if (name.length > 0 && email.length > 0 && password.length > 0) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/updateProfile`, {
                username: user.username,
                name: name,
                email: email,
                password: password
            }).then(res => {
                // console.log(res)
                if (res.data.message === 'ok') {
                    axios.post(process.env.REACT_APP_SERVER_URL + "/signin", {
                        username: user.username,
                        password: password
                    }).then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        } else {
                            localStorage.setItem("isAuthenticated", "true");
                        }
                    });
                    signin();
                    document.getElementById('close').click();
                    window.location.reload();
                }
                else {
                    document.getElementById('alert').style.display = 'block'
                    document.getElementById('alert').innerHTML = res.data.message
                }
            }).catch(err => console.log(err))
        }
        else {
            document.getElementById('alert').style.display = 'block'
            document.getElementById('alert').innerHTML = 'Please fill all the fields'
        }
    }

    const signin = () => {
        axios.get(process.env.REACT_APP_SERVER_URL + "/signin").then((response) => {
            console.log(response.data);
            if (response.data.loggedIn === true) {
                // window.location.pathname = "/dashboard";
                // console.log(response.data.user[0])
                setUser(response.data.user[0])
            }
            else {
                console.log("not logged in")
            }
        });
    }

    useEffect(() => {
        signin()
    }, []);


    return (
        <div>
            <div className="container col-xxl-8 px-4 py-5 min-vh-100">
                <div>
                    <div style={{ display: "none" }} id="ps-alert" className="alert alert-success text-center" role="alert">
                        Password updated successfully
                    </div>
                    <div style={{margin:"10%", maxWidth:"800px"}} className="card shadow">
                        <div className="card-header">
                            <h5 className="card-title">Profile</h5>
                        </div>

                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane active" id="profile">
                                    <div className="card-body table-responsive p-0">
                                        <table className="table table-hover">
                                            <tbody>
                                                <tr>
                                                    <th>Name</th>
                                                    <td>{user.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Username</th>
                                                    <td>{user.username}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{user.email}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-primary mx-5" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                                Edit Profile
                                            </button>
                                            <button className="btn btn-primary mx-1" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                                Change Password
                                            </button>
                                        </div>
                                        {/* edit profile modal */}
                                        <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Edit Profile</h5>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form id="form2">
                                                            <div className="form-group m-3">
                                                                <input type="text" className="form-control" onChange={(e) => { setName(e.target.value) }} id="exampleInputPassword3" placeholder="Name" />
                                                            </div>
                                                            <div className="form-group m-3">
                                                                <input type="email" className="form-control" onChange={(e) => { setEmail(e.target.value) }} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                                            </div>
                                                            <div className="form-group m-3">
                                                                <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword5" placeholder="Password" />
                                                            </div>
                                                            <div id="alert" style={{ display: "none" }} className="alert alert-primary text-center" role="alert">
                                                            </div>
                                                            <div className="d-flex justify-content-center">
                                                                <button type="submit" className="btn btn-primary m-3" onClick={updateProfile}>Submit</button>
                                                                <button type="button" className="btn btn-secondary m-3" id="close" data-bs-dismiss="modal">Close</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* change password modal */}
                    <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group m-3">
                                            <input type="password" onChange={(e) => { setOldPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" placeholder="Old Password" />
                                            <small id="emailHelp" className="form-text text-muted">We'll never share your pass with anyone else.</small>
                                        </div>
                                        <div className="form-group m-3">
                                            <input type="password" onChange={(e) => { setNewPassword(e.target.value) }} className="form-control" id="exampleInputPassword2" placeholder="New Password" />
                                        </div>
                                        <div className="form-group m-3">
                                            <input type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} className="form-control" id="exampleInputPassword4" placeholder="Confirm Password" />
                                        </div>
                                        <div id="alert2" style={{ display: "none" }} className="alert alert-primary text-center" role="alert">
                                        </div>
                                        {/* submit and close button */}
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn btn-primary m-3" onClick={changePassword}>Submit</button>
                                            <button type="button" className="btn btn-secondary m-3" id="close2" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
