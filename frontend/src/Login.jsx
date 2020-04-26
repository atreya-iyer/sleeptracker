// import React from 'react';
import React, { useState } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


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

export default ({setUid, loggedIn, setLoggedIn}) => {


    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically or whether we leave that to developer to handle.
                setLoggedIn(true);
                setUid(firebase.auth().currentUser.uid);
                return false; // don't redirect
            },
            uiShown: function() {
                // The widget is rendered.
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '/',
        signInOptions: [
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
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
            {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p> */}
            {/* <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
            {/* <button onClick={setLoggedIn(true)}>log in</button>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
            {ui.start('#firebaseui-auth-container', uiConfig)}   */}
        </div>
    )
};