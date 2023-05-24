
import './App.css';
import React, { useState, useEffect,createContext, useContext } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import CreateKudo from './components/CreateKudo';
import Home from './components/Home';
import Board from './components/Board';
import AddPost from './components/AddPost';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Link from './components/Link';

import Sidebar from './components/Admin/Sidebar';

function App() {
  const [user, setLoginUser] = useState({
    id: "",
    firstname: "",
    lastname: ""
  });



  let project ="MAI";
  const isLoggedin = (userdata) => {
    setLoginUser({
      id: userdata._id,
      firstname: userdata.firstname,
      lastname: userdata.lastname
    })
  }

  return (
    <>
   
    <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route exact path='login' element={<Login isLoggedin={isLoggedin} />} />
        <Route exact path='dashboard/:id' element={<Dashboard />} />
        <Route exact path='create' element={<CreateKudo />} />
        <Route path='board/:id' element={<Board />} />
        <Route path='addpost/:id' element={<AddPost />} />
        <Route path='links/:id' element={<Link />} />
        <Route path ='admin-user' element={<Sidebar/>}/>
       
      </Routes>
     
     
      <Footer/>
  
      

     
    </>
  );
}
export default App;

