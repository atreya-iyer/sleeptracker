const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');

// docs, for future reference:
//      https://firebase.google.com/docs/firestore/quickstart?authuser=0

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

app.get('/getUsers', async (req, res) => {
    const allUsers = await usersCollection.get();
    const users = [];
    for (let doc of allUsers.docs) {
        let user = doc.data();
        user.id=doc.id;
        users.push(user);
    }
    res.send(users);
});

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
