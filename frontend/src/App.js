import React, { useState, useEffect } from 'react';
import './App.css';
import SleepInfo from './SleepInfo'
// import Login from './Login'
import Auth from './Auth'

function App() {

  const[uid, setUid] = useState("");
  // const[loggedIn, setLoggedIn] = useState(false);
  // hardcode some stuff
  // const[uid, setUid] = useState("Hca3mdVps6Z2QvqGDuxMVlJH2zV2");
  // const[loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="App">
      <h1>Sleep...</h1>
      <Auth callback={setUid}>
        <SleepInfo uid={uid} />
      </Auth>
      {/* {!loggedIn && <Login setUid={setUid} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} */}
      {/* {loggedIn ? "" : "not" } logged in */}
      {/* {loggedIn && <SleepInfo uid={uid} />} */}
    </div>
  );
}

export default App;

