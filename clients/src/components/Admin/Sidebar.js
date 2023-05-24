import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Button } from 'react-bootstrap';

function Sidebar() {

    const [user, setuser] = useState();
    const [allPost, setAllPost] = useState()
    const [loading, setloading] = useState(true);
    const [post, setpost] = useState(false);
    const [userdata, setuserdata] = useState(true);
    function fetchUser() {
        axios
            .get(`http://localhost:4000/user`)
            .then((res) => {

                setuser(res.data);
                setloading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }



    function getAllPost() {
        axios
            .get(`http://localhost:4000/allpost`)
            .then((res) => {

                setAllPost(res.data);
                setloading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchUser();
        getAllPost();
    }, [])



    async function handleDelete(e) {

        try {
            const res = await axios.delete(`http://localhost:4000/admin-user/${e.target.name}`);
            if (res.data.success) {
                alert(res.data.msg);
                window.location.reload();
            }
        }
        catch (err) {
            console.error(err);
        }
    }


    setTimeout(() => {

        let sidebar = document.querySelector(".sidebar");
        let sidebarBtn = document.querySelector(".sidebarBtn");
        sidebarBtn.onclick = function () {
            sidebar.classList.toggle("active");
            if (sidebar.classList.contains("active")) {
                sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
            } else {
                sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
            }

        }
    }, 3000);

    return (
        <>
            <div class="sidebar">
                <div class="logo-details">
                    <i class='bx bxl-c-plus-plus'></i>
                    <span class="logo_name">KudoBoard</span>
                </div>
                <ul class="nav-links">
                    <li>
                        <a href="#" class="active">
                            <i class='bx bx-grid-alt' ></i>
                            <span class="links_name" onClick={() => { setuserdata(true); setpost(false) }} >All User</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class='bx bx-box' ></i>
                            <span class="links_name" onClick={() => { setpost(true); setuserdata(false) }} >All Posts</span>
                        </a>
                    </li>



                    <li class="log_out">
                        <a href="#">
                            <i class='bx bx-log-out'></i>
                            <span class="links_name">Log out</span>
                        </a>
                    </li>
                </ul>
            </div>
            <section class="home-section">
                <nav>
                    <div class="sidebar-button">
                        <i class='bx bx-menu sidebarBtn'></i>
                        <span class="dashboard">Dashboard</span>
                    </div>

                </nav>

                <div class="home-content">
                    <div class="overview-boxes">
                        <div class="box">
                            <div class="right-side">
                                <div class="box-topic">Total Post</div>
                                <div class="number">{!loading && allPost ? allPost.length : "-"}</div>

                            </div>

                        </div>
                        <div class="box">
                            <div class="right-side">
                                <div class="box-topic">Total User</div>
                                <div class="number">{!loading && user ? user.length : "-"}</div>
                            </div>
                        </div>
                    </div>


                    {
                        userdata == true ?
                            <div class="sales-boxes">
                                <div class="recent-sales box">
                                    <div class="title">All details</div>

                                    <table id="customers">
                                        <tr class="details">
                                            <th class="topic">First Name</th>
                                            <th class="topic">Last Name</th>
                                            <th class="topic">Email</th>
                                            <th class="topic">Password</th>
                                            <th class="topic">Action</th>
                                        </tr>

                                        {
                                            !loading && user ? user.map((item) => (
                                                <>
                                                    <tr>
                                                        <td>{item.firstname}</td>
                                                        <td>{item.lastname}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.password}</td>
                                                        <td><Button name={item._id} onClick={handleDelete}>Delete</Button></td>
                                                    </tr>
                                                </>
                                            )) : "Loading"

                                        }
                                    </table>


                                </div>


                            </div> : post == true ? <div class="sales-boxes">
                                <div class="recent-sales box">
                                    <div class="title">All details</div>

                                    <table id="customers">
                                        <tr class="details">
                                            <th class="topic">User Name</th>
                                            <th class="topic">Message</th>
                                            <th class="topic">Post Image</th>
                                            <th class="topic">Reciever Email</th>
                                            <th class="topic">User ID</th>
                                            <th class="topic">UUID</th>
                                            <th class="topic">Created date</th>
                                            <th class="topic">Action</th>
                                        </tr>

                                        {
                                            allPost ? allPost.map((item) => (
                                                <>
                                                    <tr>
                                                        <td>{item.name}</td>
                                                        <td>{item.message}</td>
                                                        <td>{item.profileImg}

                                                        </td>
                                                        <td>{item.rec_email}</td>
                                                        <td>{item.userid}</td>
                                                        <td>{item.uuid}</td>
                                                        <td>{item.expire_at.slice(0, 10)}</td>
                                                        <td><Button name={item._id}>Delete</Button></td>

                                                    </tr>
                                                </>
                                            )) : "Loading"

                                        }
                                    </table>


                                </div>


                            </div> : "no data"
                    }







                </div>
            </section>

        </>
    )
}

export default Sidebar