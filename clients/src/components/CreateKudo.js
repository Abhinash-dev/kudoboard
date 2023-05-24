import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
function CreateKudo() {
  const navigate = useNavigate();
  const [data, setData] = useState({ recipient_name: "", title: ""});
  const [selectValue, setSelectValue] = useState("");
  const [userid, setuserid] = useState(localStorage.getItem('user_id'));
  const handleOption = (event) => {
    const value = event.target.value;
    setSelectValue(value);
  };

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    const AllData = {
      selectValue,
      recipient_name: data.recipient_name,
      title: data.title,
      userid:userid
    };
    axios
      .post("http://localhost:4000/create", AllData)
      .then((res) => {
        setData({ title: "",  recipient_name: "" });
       navigate(`/board/${res.data.data._id}`)
      })
      .catch((err) => {
        console.log("Error couldn't create Kudo");
        console.log(err.message);
      });
  }
  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create your board</h2>

                  <form onSubmit={handleSubmit}>


                    <div className='form-container'>

                      <label>Enter an Occasion</label>
                      <select name="" onChange={handleOption}>
                        <option value="">select</option>
                        <option value="Birthday & Celebration">Birthday & Celebration</option>
                        <option value="Farewell">Farewell</option>
                        <option value="Sympathy & Getwell">Sympathy & Getwell</option>
                        <option value="Thank You">Thank You</option>
                        <option value="Welcome & onboarding">Welcome & onboarding</option>
                        <option value="Work Anniversary">Work Anniversary</option>
                        <option value="Others">Others</option>


                      </select>
                      <label>Recipient Name</label>
                      <input type="text" name="recipient_name" value={data.name} onChange={handleChange} />
                      <label>What should the title be?</label>
                      <input type="text" name="title" value={data.title} placeholder='Happy birthday, Work Anniversary etc'
                        onChange={handleChange} />

                      {/* <label>Enter your email</label>
                      <input type="email" name="email" value={data.email}
                        onChange={handleChange} /> */}

                    </div>
                    <div className="d-flex justify-content-center">
                      <button type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Create</button>
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

export default CreateKudo