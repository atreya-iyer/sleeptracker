const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');

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
    if (typeof userInfo === 'undefined') {res.send('need request body!'); return;}
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
