import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login'

function App() {

  const[uid, setUid] = useState('');
  const[loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1>Sleep...</h1>
      <Login callback={setUid} loggedIn={loggedIn} setLI={setLoggedIn} />
      {uid} is logged in
    </div>
  );
}

export default App;

