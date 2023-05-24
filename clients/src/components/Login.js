import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
function Login({ isLoggedin }) {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = e => {
        setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.email.includes("@hcl.com")) {
            axios.post("http://localhost:4000/login", user)
                .then(res => {

                    res.data.user === undefined ? alert("invalid credential") :
                     
                    // isLoggedin(res.data.user);
                    localStorage.setItem('user_id', res.data.user._id);
                    localStorage.setItem('firstname', res.data.user.firstname);
                    localStorage.setItem('lastname', res.data.user.lastname);
                    localStorage.setItem('project', res.data.user.project);
                    alert(res.data.message)
                    if (res.data.user.email === "sharma.abhinash11@hcl.com" && res.data.user.password === "abhi123") {
                        window.location.href = `${window.location.origin}/admin-user`;
                    } else {
                        window.location.href = `${window.location.origin}/dashboard/${res.data.user._id}`;
                    }

                })
        } else {
            alert("please use hcl email id")
        }

    }
    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Login</h2>

                                    <form onSubmit={handleSubmit}>
                                        <div className='form-container'>


                                            <label>Email</label>
                                            <input type="email" name="email" value={user.email}
                                                onChange={handleChange} />

                                            <label>password</label>
                                            <input type="password" name="password" value={user.password}
                                                onChange={handleChange} />

                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                                        </div>

                                        <p class="text-center text-muted mt-5 mb-0">Don't have an account? <a href="register"
                                            class="fw-bold text-body"><u>Sign up</u></a></p>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login