import React from 'react';
// import React, { useState } from 'react';

export default ({setUid, loggedIn, setLI}) => {

    let firebase = require('firebase');
    let firebaseui = require('firebaseui');

    // Add the Firebase products that you want to use
    // do we need these? i'd think so
    // require("firebase/auth");
    // require("firebase/firestore");

    const firebaseConfig = { // cannot tell if this is supposed to be secret
        apiKey: "AIzaSyDdbixuZRIwD9KNPpaxWZnpvgDAZJJ_Q68",
        authDomain: "sleeptracker-7640d.firebaseapp.com",
        databaseURL: "https://sleeptracker-7640d.firebaseio.com",
        projectId: "sleeptracker-7640d",
        storageBucket: "sleeptracker-7640d.appspot.com",
        messagingSenderId: "966736500810",
        appId: "1:966736500810:web:c28b61c3de36bedaf0eeb3",
        measurementId: "G-M5EKQPM37H"
    };

    firebase.initializeApp(firebaseConfig);

    let ui = new firebaseui.auth.AuthUI(firebase.auth())

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //   // User is signed in.
            setUid(user.uid);
            
            console.log(user.uid); //worth a shot?
            
        //   var displayName = user.displayName;
        //   var email = user.email;
        //   var emailVerified = user.emailVerified;
        //   var photoURL = user.photoURL;
        //   var isAnonymous = user.isAnonymous;
        //   var uid = user.uid;
        //   var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log('signed out');
          // ...
        }
      });

    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                // console.log(firebase.auth().currentUser.uid);
                // console.log(firebase.auth().currentUser.getIdToken);
                // setLI(true);
                return true;
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        // tosUrl: '<your-tos-url>',
        // // Privacy policy url.
        // privacyPolicyUrl: '<your-privacy-policy-url>'
    };
    
    return (
        <div>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
            {ui.start('#firebaseui-auth-container', uiConfig)}  
        </div>
    )
};