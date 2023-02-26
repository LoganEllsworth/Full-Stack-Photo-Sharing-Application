import './App.css';
import React, { Fragment, useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import RegisterUser from './components/registerUser';
import Login from './components/login';

function App() {
  return (
    <BrowserRouter>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className='nav-link'>Group54</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link to="/register" className='nav-link'>Register</Link>
            <Link to="/login" className='nav-link'>Login</Link>
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/search" className='nav-link'>Search</Link>
            <Link to="/profile" className='nav-link'>Profile</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={null} />
        <Route exact path="/register" element={<RegisterUser />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/example/:id" element={null} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;