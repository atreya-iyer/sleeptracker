import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">

        <script src="/__/firebase/7.14.1/firebase-app.js"></script>


        <script src="/__/firebase/7.14.1/firebase-analytics.js"></script>


        <script src="/__/firebase/7.14.1/firebase-auth.js"></script>
        <script src="/__/firebase/7.14.1/firebase-firestore.js"></script>

        <script src="/__/firebase/init.js"></script>
    </div>
  );
}

export default App;



// const admin = require('firebase-admin');
// const firebase = require('firebase');
// const firebaseui = require('firebaseui');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://sleeptracker-7640d.firebaseio.com"
// });
// const ui = new firebaseui.auth.AuthUI(firebase.auth());
/* {
  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  })
} */
