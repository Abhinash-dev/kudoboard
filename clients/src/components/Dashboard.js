import React, { useEffect, useState, useContext } from 'react'
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import Pagination from './Pagination';

function Dashboard() {
  const [items, setItem] = useState([]);
  const [title, settitle] = useState();
  const [loading, setloading] = useState(true);
  const [userid, setuserid] = useState(localStorage.getItem('user_id'));
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  let param = useParams();

  function getUserBoard() {

    axios
      .get(`http://localhost:4000/dashboard/${param.id}`)
      .then((res) => {
        setItem(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserBoard();
  }, [])

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = items.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(items.length / recordsPerPage)
  return (
    <>
      <div className='home-container-dashboard'>
        <div className='container'>
          {
            !loading && items.length ? currentRecords.map((item) => (
              <div className='home-card'>
                <div className='home-img-container'>
                  <img src={item.profileImg} />
                </div>
                <div className='right-content'>
                  <h3>{item.message}</h3>
                  <p>For <span className='span-content'>{item.recipient_name}</span></p>
                  <p>Created At: <span className='span-content'>{item.expire_at.slice(0, 10)}</span></p>
                  <p>Creator: <span className='span-content'>{item.name}</span></p>
                </div>
                <div className='view-board'>
                  <Link to={`${window.location.origin}/board/${item.id}`} >View Board</Link>
                </div>
              </div>
            )) : "You don't have any board "
          }

        </div>
        <div>
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

export default Dashboard