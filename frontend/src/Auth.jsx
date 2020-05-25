import React, {useState, useEffect} from 'react';
import 'firebase/auth';
import * as firebase from 'firebase/app';
// import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
const firebaseConfig = require('./firebase-config.json');

firebase.initializeApp(firebaseConfig);

export default ({children, callback}) => {
    const [user, setUser] = useState(null);

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],


    };

    const onAuthStateChange = () => {
        return firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            callback(user&&user.uid ? user.uid : "");
        })
    };
    useEffect(() => onAuthStateChange(), []);
    return (
        <div>
            {/* un-authenticated things can go here */}
            {user && children}
            {!user && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
            <br />
            {user && <button onClick={() => firebase.auth().signOut()}>Sign out</button>}
        </div>
    )
}


// // //////////////// ours
// // import firebase from 'firebase';
// // import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';




// export default ({setUid, loggedIn, setLoggedIn}) => {


//     const uiConfig = {
//         callbacks: {
//             signInSuccessWithAuthResult: (authResult, redirectUrl) => {
//                 // User successfully signed in.
//                 setLoggedIn(true);
//                 setUid(firebase.auth().currentUser.uid);
//                 return false; // don't redirect
//             },
//             uiShown: function() {
//                 // The widget is rendered.
//             }
//         },
//         // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//         signInFlow: 'popup',
//         signInSuccessUrl: '/',
//         signInOptions: [
//             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//             firebase.auth.EmailAuthProvider.PROVIDER_ID
//         ],
//         // Terms of service url.
//         // tosUrl: '<your-tos-url>',
//         // // Privacy policy url.
//         // privacyPolicyUrl: '<your-privacy-policy-url>'
//     };

//     return (
//         <div>
//             <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
//             {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p> */}
//             {/* <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
//             {/* <button onClick={setLoggedIn(true)}>log in</button>
//             <div id="firebaseui-auth-container"></div>
//             <div id="loader">Loading...</div>
//             {ui.start('#firebaseui-auth-container', uiConfig)}   */}
//         </div>
//     )
// };