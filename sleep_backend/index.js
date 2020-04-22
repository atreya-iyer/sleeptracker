const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// var uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: '<url-to-redirect-to-on-success>',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   // Terms of service url.
//   tosUrl: '<your-tos-url>',
//   // Privacy policy url.
//   privacyPolicyUrl: '<your-privacy-policy-url>'
// };


// ui.start('#firebaseui-auth-container', {
//   signInFlow: 'popup',
//   signInSuccessUrl: '<url-to-redirect-to-on-success>',
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
// });

// ui.start('#firebaseui-auth-container', uiConfig);

// docs, for future reference:
//      https://firebase.google.com/docs/firestore/quickstart?authuser=0
//https://firebase.google.com/docs/web/setup?authuser=1v for starting firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sleeptracker-7640d.firebaseio.com"
});

const app = express();
app.use(bodyParser.json());

const db = admin.firestore();
const usersCollection = db.collection('users');

// todo -> function that has "body value retrieval" -> [success, uid, id] = retr(body, ['uid', 'id']);
// todo -> clean up "const" vs "let" oops
// todo -> which are awaits?

app.get('/', (req, res) => {
    res.send('success!');
});

app.get('/users', async (req, res) => {
    const allUsers = await usersCollection.get();
    const users = [];
    for (let doc of allUsers.docs) {
        let user = doc.data();
        user.id=doc.id;
        users.push(user);
    }
    res.send(users);
});



app.post('/sleeps/start', (req, res) => {
    // given uid in post body, creates a new sleep for that uid at current start time 
    const userInfo = req.body;
    if (typeof userInfo === 'undefined') {res.send('need request body!'); return;} // I don't think this works...
    const uid = userInfo.uid; const start_time = userInfo.start_time;
    if (typeof uid === 'undefined') {res.send('missing required field!'); return;}
    // if (typeof uid === 'undefined' || typeof start_time === 'undefined') {res.send('missing required field!'); return;}

    // apparently we're using a "subcollection"
    let sleepRef = usersCollection.doc(uid).collection('sleeps').doc();
    
    // firebase.database.ServerValue.TIMESTAMP --> but haven't imported firebase
    // might have frontend send time?
    let sleepInfo = {start: new Date(), in_progress: true};
    sleepRef.set(sleepInfo);
    res.send('whatever');

});


// how to query: see https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html
// https://googleapis.dev/nodejs/firestore/latest/Query.html

app.post('/sleeps/end', async (req, res) => {
    const userInfo = req.body;
    const uid = userInfo.uid;
    if (typeof uid === 'undefined') {res.send('missing required field!'); return;}

    const sleepCollection = await usersCollection.doc(uid).collection('sleeps');
    // find the single most recent in_progress sleep
    const sleeps = await sleepCollection.where('in_progress', '==', true).orderBy('start', "desc").limit(1).get();
    let sleep = {};
    let s_id = null;
    for (let doc of sleeps.docs) {
        // if you found a sleep, take its data
        sleep = doc.data();
        s_id = doc.id;
        sleep.start = sleep.start.toDate(); // this makes it a js Date; but do whatever format
    }
    // now update!
    sleep.end = new Date();
    sleep.in_progress = false;
    // if somehow no sleeps in progress, make a new one and end it
    if (s_id === null) sleepCollection.doc().set({start: new Date(), ...sleep});
    // otherwise update sleep as expected
    else sleepCollection.doc(s_id).set(sleep);

    res.send('successfully ended a sleep');
});

app.get('/sleeps', async (req, res) => {
    const query = req.body;
    // identify user
    const uid = query.uid;
    if (typeof uid === 'undefined') {res.send('missing required field!'); return;}
    
    // retrieve most-recently-started sleeps for a user
    let sleepCollection = usersCollection.doc(uid).collection('sleeps').orderBy('start', 'desc');
    // if given a number of results to return, set that limit
    if (query.num_results !== 'undefined') sleepCollection = sleepCollection.limit(query.num_results);

    // retrieve and return list
    const sleepsObj = await sleepCollection.get();
    const sleeps = [];
    for (let doc of sleepsObj.docs) {
        let sleep = doc.data();
        sleep.sleepid = doc.id;
        sleeps.push(sleep);
    }
    res.send(sleeps);
});


// there's something like album.doc(id).update(uJson);
//i googled it and apparently put requsts are used for this? not sure
// 
app.put('/sleeps/:sleepid', async(req, res) => {
    const userInfo = req.body;
    const ustart = req.body.start;
    const uend = req.body.end;
    const uid = req.body.uid;
    const usleepid = req.params.sleepid;
    if (typeof uid === 'undefined' || typeof usleepid === 'undefined')
      {res.send('missing required field!'); return;}

    const upsleep= await usersCollection.doc(uid).collection('sleeps').doc(usleepid);
    upsleep.update(
      {
        start: ustart,
        end: uend,
        ...upsleep
      }
    );
    
})

// app.post('/createUser', async (req, res) => {
//     const userInfo = req.body; // parse w bodyparser
//     if (typeof userInfo === 'undefined') {res.send('need request body!'); return;}

//     const email = userInfo.email.trim();
//     const password = userInfo.password.trim();
//     // check no duplicate email? hacking someone's acc by upserting a new password would be pretty sick
//     if (typeof email === 'undefined' || typeof password === 'undefined')
//         {res.send('missing email or password!'); return;}

//     let userRef = usersCollection.doc();
//     let info = {email: email, password: password, name: "", goal: 0, active: true};
//     userRef.set(info);
//     let id = userRef.id;
//     let success = 'success creating user with email '.concat(email).concat(' and id '.concat(id));
//     res.send(success);
// });

// see https://firebase.google.com/docs/reference/node/firebase.auth.Auth and https://firebase.google.com/docs/auth/web/google-signin
// see https://firebase.google.com/docs/auth/web/firebaseui?authuser=1 for UI version
// const firebase = require('firebase');
// app.post('/createAccount', (req, res) => {
//     let success = '';
//     const loginInfo = req.body; // parse w bodyparser
//     if (typeof loginInfo === 'undefined') success = 'need request body!';
//     else {
//         const email = loginInfo.email;
//         const password = loginInfo.password;
//         if (typeof email === 'undefined' || typeof password === 'undefined') success = 'missing email or password!';
//         else {
//             success = 'success creating user with email '.concat(email);
//             firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//                 // Handle Errors here.
//                 let errorCode = error.code;
//                 let errorMessage = error.message;
//                 // ...
//                 success = 'error: '.concat(errorMessage);
//             });
//         }
//     }
//     res.send(success);
// });



// app.post('/createSong', function (req, res) {
//   const song = req.body; // parse w bodyparser
//   let songRef = album.doc();
//   songRef.set(song);
//   let id = songRef.id;
//   res.send(id);
// });

// app.get('/getSongs', async function (req, res) {
//   const allSongs = await album.orderBy('name').get(); 
//   const songs = [];
//   for (let doc of allSongs.docs) {
//     let song = doc.data();
//     song.id = doc.id;
//     songs.push(song);
//   }
//   res.send(songs);
// });

// app.post('/updateRating', function (req, res) {
//   const update = req.body;
//   const id = update.id;
//   const uJson = {rating: update.rating};
//   album.doc(id).update(uJson);
//   res.send('Updated rating of song "'+id+'" to '+update.rating);
// });

// app.delete('/deleteSong', function (req, res) {
//   const id = req.query.id;
//   album.doc(id).delete();
//   res.send('Deleted song "'+id+'"');
// });

app.listen(8080, function () { console.log('app started - go to http://localhost:8080/') });
