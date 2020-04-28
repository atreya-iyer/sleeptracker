import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import SleepInfo from './SleepInfo'
import Login from './Login'

function App() {

  const[uid, setUid] = useState("");
  const[loggedIn, setLoggedIn] = useState(false);
  // hardcode some stuff
  // const[uid, setUid] = useState("Hca3mdVps6Z2QvqGDuxMVlJH2zV2");
  // const[loggedIn, setLoggedIn] = useState(true);
  const name = "sample person"

  return (
    <div className="App">
      <h1>Sleep...</h1>
      {!loggedIn && <Login setUid={setUid} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {loggedIn ? (name + " is") : "not" } logged in
      {loggedIn && <SleepInfo uid={uid} />}
    </div>
  );
}

export default App;

