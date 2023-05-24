
import React, { useState } from 'react'
import axios from "axios";

function Register() {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        project:""
    })
   
    const handleChange = e => {
       
        setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);

        const { firstname, lastname, email, password, project} = user;

        if (email.includes("@hcl.com")) {
            if (password.length < 6 || password.length > 15) {
                alert("password must be between 6 to 15 character long")
            }else if (firstname && lastname && email && password && project) {

                axios.post("http://localhost:4000/register", user)
                    .then(res => {
                        alert(res.data.msg)
                        if (res.data.success === true) {
                             window.location.href = `${window.location.origin}/login`;
                        } else {
                            window.location.reload();
                        }
                    })
                    .catch(err => alert("something wrong"));
            } else {
                alert("please filled all required detail")
            };
        } else {
            alert("please use hcl email id")
        }

    }
    return (
        <section className="vh-100 bg-image-register">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card">
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Registration</h2>

                                    <form onSubmit={handleSubmit}>
                                        <div className='form-container'>

                                            <label>First Name</label>
                                            <input type="text" id="create-account-pseudo" name="firstname" value={user.firstname} onChange={handleChange} placeholder="First Name" required />
                                            <label>Last Name</label>
                                            <input type="text" id="create-account-pseudo" name="lastname" value={user.lastname} onChange={handleChange} placeholder="Last Name" required />
                                            <label>Email</label>
                                            <input type="email" name="email" value={user.email}
                                                onChange={handleChange} required />

                                            <label>password</label>
                                            <input type="password" name="password" value={user.password}
                                                onChange={handleChange} required />
                                            <label>Select your Project</label>
                                            <select name="project" onChange={handleChange}>
                                                <option value="">select</option>
                                                <option value="Identity">Identity</option>
                                                <option value="kondo">Kondo</option>
                                                <option value="MAI">MAI</option>
                                                <option value="fans">Fans</option>
                                                <option value="platform">Platform</option>
                                               


                                            </select>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit"
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                        </div>

                                        <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="login"
                                            class="fw-bold text-body"><u>Login here</u></a></p>

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

export default Register