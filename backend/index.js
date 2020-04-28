const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');

// moved ui stuff to new file ui_stuff

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

const str_missing = 'missing required field!'

// todo -> function that has "body value retrieval" -> [success, uid, id] = retr(body, ['uid', 'id']);
// todo -> clean up "const" vs "let" oops
// todo -> which are awaits?
// todo -> catch/handle errors lmao
// todo -> turn loops into maps
// todo -> other user data so  can display name stuff
// todo -> stuff from latest lecture

const retr = (body, fields) => {
    let missing = false;
    const vals = fields.map(v => {
        if (typeof body[v] === 'undefined') missing = true; return body[v];
    })
    return [missing, vals];
};

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
    // // given uid in post body, creates a new sleep for that uid at current start time 
    const body = req.body;
    let [missing, [uid, start_time]] = retr(body, ['uid', 'start_time']);
    if (missing) {res.send(str_missing); return;}
    // if (typeof body === 'undefined') {res.send('need request body!'); return;} // I don't think this works...

    // apparently we're using a "subcollection"
    let sleepRef = usersCollection.doc(uid).collection('sleeps').doc();
    
    // firebase.database.ServerValue.TIMESTAMP --> but haven't imported firebase
    // might have frontend send time?
    let sleepInfo = {start: new Date(), in_progress: true};
    sleepRef.set(sleepInfo);
    res.send('started sleep');

});


// how to query: see https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html
// https://googleapis.dev/nodejs/firestore/latest/Query.html

app.post('/sleeps/end', async (req, res) => {
    const userInfo = req.body;
    const uid = userInfo.uid;
    if (typeof uid === 'undefined') {res.send(str_missing); return;}

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

// app.get('/sleeps:uid&:num_results', async (req, res) => {
app.get('/sleeps', async (req, res) => {
    const uid = req.query.uid;
    const num_results = req.query.num_results;
    // handle missing uid todo
    
    // retrieve most-recently-started sleeps for a user
    let sleepCollection = usersCollection.doc(uid).collection('sleeps').orderBy('start', 'desc');
    // if given a number of results to return, set that limit
    if (typeof num_results !== 'undefined') sleepCollection = sleepCollection.limit(parseInt(num_results));

    // retrieve and return list
    const sleepsObj = await sleepCollection.get();
    const sleeps = [];
    for (let doc of sleepsObj.docs) {
        let sleep = doc.data();
        sleep.sleepid = doc.id;
        sleep.start = sleep.start.toDate(); // this makes it a js Date; but do whatever format
        if (!sleep.in_progress) {
            sleep.end = sleep.end.toDate();
            sleep.duration = (sleep.end - sleep.start) / (1000*3600); // in hours
        }
        sleeps.push(sleep);
    }
    res.send(sleeps);
});

app.get('/sleeps/inprogress', async (req, res) => {
    const uid = req.query.uid;
    const sleepCollection = usersCollection.doc(uid).collection('sleeps');
    const sleeps = await sleepCollection.where('in_progress', '==', true).get();
    res.send(sleeps.docs.length>0);

});

app.put('/sleeps/:sleepid', (req, res) => {
    const body = req.body;
    let [missing, [uid]] = retr(body, ['uid']);
    let [missing2, [ustart, uend]] = retr(body, ['start', 'end']);
    if (missing || missing2) {res.send(str_missing); return;}
    const sleepid = req.params.sleepid;
    
    const user = usersCollection.doc(uid)
    const usercollec = user.collection('sleeps')
    const upsleep = usercollec.doc(sleepid);
    upsleep.update(
        {
            // requires all fields currently
        start: new Date(ustart),
        end: new Date(uend),
        in_progress: false
      }
    );
    res.send(
        'updated'
    );
    
})

app.delete('/sleeps/:sleepid', (req, res) => {
    const body = req.body;
    let [missing, [uid]] = retr(body, ['uid']);
    const sleepid = req.params.sleepid;
    if (missing) {res.send(str_missing); return;}
    
    usersCollection.doc(uid).collection('sleeps').doc(sleepid).delete();
    res.send('deleted sleep with id '.concat(sleepid));
});

// TIMEZONES:
// js date object stores in epoch time
// js operations can convert to local time zone (ie user timezone if client-side)
// firebase also seems to store in epoch time (the web UI converts to local time)
// so other than potential client-side conversion, we don't need to worry! they 
//          probably don't care what timezone they slept in
//      And data they took in a diff timezone will be off, but whatever
app.get('/test1', (req, res) => {
    res.send(new Date());
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
