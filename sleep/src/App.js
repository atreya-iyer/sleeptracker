import React from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  return (
    <div className="App">
      {/* <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services --> */}
      {/* <!-- Firebase App (the core Firebase SDK) is always required and must be listed first --> */}
      {/* <script src="/__/firebase/7.14.1/firebase-app.js"></script>
      <script src="/__/firebase/7.14.1/firebase-auth.js"></script>
      <script src="/__/firebase/init.js"></script>
      <script>
        // TODO: Replace the following with your app's Firebase project configuration
        var firebaseConfig = {
          // ...
        };
        firebase.initializeApp(firebaseConfig);
      </script> */}

      <script src="/__/firebase/7.14.1/firebase-app.js"></script>


      <script src="/__/firebase/7.14.1/firebase-analytics.js"></script>


      <script src="/__/firebase/7.14.1/firebase-auth.js"></script>
      <script src="/__/firebase/7.14.1/firebase-firestore.js"></script>

      <script src="/__/firebase/init.js"></script>

      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
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
