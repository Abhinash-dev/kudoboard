import React, { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const UserContext = createContext();
let project = localStorage.getItem('project');
https://s3.amazonaws.com/kudoboard-assets/templates/201/backgrounds/lowres/aytheZyS.jpg
root.render(
  <div style={{
    backgroundImage: project == "kondo" ? `url(https://www.kudoboard.com/images/vintage-background.png)` :
      project == "identity" ? `url(https://s3.amazonaws.com/kudoboard-assets/templates/228/backgrounds/lowres/KaHe1KRL.jpg)` :
        project == "MAI" ? 'url(https://s3.amazonaws.com/kudoboard-assets/templates/198/backgrounds/lowres/JKTKLJAd.jpg)' :
          project == "fans" ? 'url(https://s3.amazonaws.com/kudoboard-assets/templates/223/backgrounds/lowres/cMuFSmxL.jpg)' : 
          project == "platform" ? 'url(https://s3.amazonaws.com/kudoboard-assets/templates/201/backgrounds/lowres/aytheZyS.jpg)' : ""
  }}>
    <UserContext.Provider value={project}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>

      </React.StrictMode>
    </UserContext.Provider>

  </div>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
