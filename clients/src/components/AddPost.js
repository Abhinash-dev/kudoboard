
import React, { useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function AddPost() {
  const [data, setData] = useState({ name: "", message: "", email: "", image: "" });
  const [file, setFile] = useState();
  let param = useParams();
  const navigate = useNavigate();

  const location = useLocation();
 


  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }
  const handleFile = (e) => {
   
    setData({ ...data, image: e.target.files[0] })
  };
  function handleSubmit(e) {
    e.preventDefault();
  

    if (data.email.includes('@hcl.com')) {
      let uuid = Math.random().toString().substr(2, 6);
      const formdata = new FormData();
      formdata.append('image', data.image);
      formdata.append('name', data.name);
      formdata.append('rec_email', data.email);
      formdata.append('message', data.message);
      formdata.append('id', param.id);
      formdata.append('recipient_name', location.state.recipient_name);
      formdata.append('userid', location.state.userid);
      // formdata.append('email',location.state.email)
      formdata.append('uuid', `${uuid}`)
      axios
        .post("http://localhost:4000/addpost", formdata)
        .then((res) => {
          setData({ message: "", name: "", email: "", image: "" });
          navigate(`/board/${res.data.data.id}`)
        })
        .catch((err) => {
          console.log("Error couldn't post Kudo");
          console.log(err.message);
        });
    } else {
      alert("please use hcl email id")
    }
  }




  return (
    <section className="vh-100 bg-image-post">
      <div className="mask d-flex align-items-center h-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Add a Post</h2>

                  <form onSubmit={handleSubmit} enctype="multipart/form-data">


                    <div className='form-container'>
                      <label for="image">Upload Image</label>
                      <input type="file" name="image" id='image' accept="image/*" onChange={handleFile} />

                      <label>Enter Your Name</label>
                      <input type="text" name="name" value={data.name} onChange={handleChange} />

                      <label>Enter Reciever Email </label>
                      <input type="email" name="email" value={data.email} onChange={handleChange} />
                      <label>Message</label>
                      <textarea type="text" name="message" value={data.title} placeholder='Add a message'
                        onChange={handleChange} style={{ width: "100%", marginBottom: "40px" }} />

                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Post</button>
                    </div>

                    {/* <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    class="fw-bold text-body"><u>Login here</u></a></p> */}

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

export default AddPost