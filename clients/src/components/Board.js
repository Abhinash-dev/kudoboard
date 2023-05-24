import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoMdCheckmark } from "react-icons/io"
import { RiCloseFill } from "react-icons/ri"
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
function Board() {
  const [items, setItem] = useState([]);
  const [title, settitle] = useState();
  const [loading, setloading] = useState(true);
  const [recipient_name, setrecipient_name] = useState();
  const [id, setid] = useState();
  const [userid, setuserid] = useState();
  const [email, setemail] = useState();
  const navigate = useNavigate();
  let param = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);



  function getPost() {
    axios
      .get(`http://localhost:4000/post/${param.id}`)
      .then((res) => {

        setItem(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPost();
  }, [])

  function getTitle() {
    axios
      .get(`http://localhost:4000/title/${param.id}`)
      .then((res) => {

        settitle(res.data[0].title);
        setrecipient_name(res.data[0].recipient_name);
        setemail(res.data[0].email)
        setuserid(res.data[0].userid)
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getTitle();
  }, [])

  async function handleDelete(e) {
    //alert("delete");

    try {
      const res = await axios.delete(`http://localhost:4000/post/${e.target.name}`);
      if (res.data.success) {
        alert(res.data.msg);
        window.location.reload();
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const handleCheckmark = (e) => {
    var value = document.getElementById(`${e.currentTarget.id}`).innerHTML;
    const data = {
      message: value
    }
    axios
      .put(`http://localhost:4000/update/${e.currentTarget.id}`, data)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })

      .catch((err) => {
        console.log("Failed to update message");
        console.log(err.message);
      });
  }

  const handleClose = (e, msg) => {
    document.getElementById(`${e.currentTarget.id}`).innerHTML = `${msg}`
  }
  const handleEdit = (e, id) => {
    document.getElementById(`${id}`).style.border = "2px solid #386bc0"
  }

  const handleLink = (e, item) => {
    let uuid = item.uuid;
    navigator.clipboard.writeText(`${window.location.origin}/links/${uuid}`);
    let linkDetail = `${window.location.origin}/links/${uuid}`;
    let linkobj = {
      name: item.name,
      rec_email: item.rec_email,
      message: item.message,
      postlink: linkDetail
    }
    axios.post("http://localhost:4000/sendlink", linkobj)
      .then((res) => {

      }).then(alert("Email sent successfully"))
      .catch((err) => {
        console.log("Error couldn't post Kudo");
        console.log(err.message);
      });
  }
  const handleClickpost = () => {
    navigate(`/addpost/${param.id}`, {
      state: {
        recipient_name,
        userid,

      }
    })
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = items.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(items.length / recordsPerPage)
  return (
    <>
      <section>
        <div className='board-heading'>
          {
            !loading && title ? <p>{title}</p> : ""
          }
        </div>
      </section>
      <div style={{ position: "relative" }}>
        <p onClick={handleClickpost} className="pill-btn">Add to board</p>
      </div>
      <div>
        <div className='board-content'>
          {!loading && items ? currentRecords.map((item) => (
            <>
              <div className='card-div' key={item._id}>
                <Card style={{ width: "360px" }}>
                  <div className='card-img-container'>
                    <Card.Img variant="top" src={item.profileImg} />
                  </div>
                  <Card.Body>
                    <Card.Text className="editable-div" id={item._id} contenteditable="true" >
                      {item.message}
                    </Card.Text>
                    <div className='icon-container'>
                      <IoMdCheckmark id={item._id} onClick={handleCheckmark} />
                      <RiCloseFill id={item._id} onClick={(e) => handleClose(e, item.message)} />
                    </div>
                  </Card.Body>
                  <Card.Footer style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu size="sm" title="">
                        <Dropdown.Item onClick={(e) => handleLink(e, item)} >Copy & Send</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => handleEdit(e, item._id)} >Edit Message</Dropdown.Item>
                        <Dropdown.Item name={item._id} onClick={handleDelete}>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <p style={{ display: "flex", justifyContent: "end", color: "#899087", fontSize: "14px" }}>From {item.name}</p>
                  </Card.Footer>
                </Card>
              </div>
            </>
          )) : ""}


        </div>
        <div style={{ paddingBottom: "200px" }}>
          {
            !loading && items.length ?
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              /> : ""
          }

        </div>
      </div>

    </>
  )
}

export default Board



const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className="threedots" />
  </a>
));