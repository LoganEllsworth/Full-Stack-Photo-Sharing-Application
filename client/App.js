import './App.css';
import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import useToken from './components/useToken';
import RegisterUser from './components/registerUser';
import Login from './components/login';
import Profile from './components/profile';
import Search from './components/search';
import Trending from './components/trending';
import Home from './components/home';

function App() {

  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className='nav-link'>Group54</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {token && <Link to="/" className='nav-link'>Home</Link>}
            {token && <Link to="/trending" className='nav-link'>Trending</Link>}
            {token && <Link to="/search/people" className='nav-link'>Search</Link>}
            {token && <Link to="/profile" className='nav-link'>Profile</Link>}
            {!token && <Link to="/login" className='nav-link'>Login</Link>}
            {token && <Link to="/login" onClick={() => setToken("")} className='nav-link'>Logout</Link>}
            {!token && <Link to="/register" className='nav-link'>Register</Link>}
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={token ? <Home token={token}/> : <Login setToken={setToken}/>} />
        <Route exact path="/register" element={<RegisterUser setToken={setToken}/>} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/profile/:id?" element={<Profile token={token} />} />
        <Route path="/search/:page?/:autoSearch?" element={<Search token={token} />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;