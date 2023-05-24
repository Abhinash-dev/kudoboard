import React, { useEffect, useState } from 'react'
import axios from "axios";
import ReactPaginate from 'react-paginate';
import Pagination from './Pagination';
function Home() {
  const [allPost, setallPost] = useState([]);
  const [title, settitle] = useState();
  const [loading, setloading] = useState(true);


  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);



  function getPost() {
    axios
      .get(`http://localhost:4000/allpost`)
      .then((res) => {
        console.log(res.data, "all post")
        setallPost(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getPost();
  }, [])

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = allPost.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(allPost.length / recordsPerPage)
  return (
    <>
      <div className='home-container'>
        <div className='container'>
          {
            !loading && allPost ? currentRecords.map((item) => (
              <>

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
                </div>


              </>
            )) : ""
          }


        </div>
        <div>
          {
            !loading && allPost.length ? 
            <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />:""
          }
        
        </div>
        
      </div>
    </>
  )
}

export default Home

