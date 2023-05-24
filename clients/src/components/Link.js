import React, { useState,useEffect } from 'react';
import axios from "axios";
import { useParams,useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
function Link() {
  const [linkpost, setlinkpost] = useState();
  const [loading, setloading] = useState(true)
    
    function getPostLink() {
      let x = window.location.href
    let uuid =x.split("links/")[1];

      const url = `http://localhost:4000/links/${uuid}`;
        axios.get(url)
        .then((res) => {
          setlinkpost([res.data[0]]);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
useEffect(()=>{
  
    getPostLink();
},[])

  return (
    <>
    <div className='board-content'>
        {(!loading && linkpost) ? linkpost.map((item) => (
          <>
          <div className='card-div'>
            <Card style={{ width: "360px" }}>
              <div className='card-img-container'>
            <Card.Img variant="top" src={item.profileImg}/>
            </div>
              <Card.Body>
                <Card.Text id={item._id} >
                  {item.message}

                </Card.Text>
                

              </Card.Body>
              <Card.Footer style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                
                <p style={{ display: "flex", justifyContent: "end", color: "#899087", fontSize: "14px" }}>From {item.name}</p>
              </Card.Footer>
            </Card>
          </div>
          </>
        )) : ""}


      </div>
    </>
  )
}

export default Link