const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// docs, for future reference:
//      https://firebase.google.com/docs/firestore/quickstart?authuser=0
//      https://firebase.google.com/docs/web/setup?authuser=1v for starting firebase
// how to query: see https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html
//      https://googleapis.dev/nodejs/firestore/latest/Query.html


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sleeptracker-7640d.firebaseio.com"
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = admin.firestore();
const usersCollection = db.collection('users');

const str_missing = 'missing required field!'

const retr = (body, fields) => {
    let missing = false;
    const vals = fields.map(v => {
        if (!body[v]) missing = true; return body[v];
    })
    return [missing, vals];
};

app.get('/', (req, res) => {
    res.send('success!');
})

app.post('/sleeps/start', (req, res) => {
    // // given uid in post body, creates a new sleep for that uid at current start time 
    let [missing, [uid]] = retr(req.body, ['uid']);
    let [missing2, [start_time]] = retr(req.body, ['currTime']);
    if (missing) {res.send(str_missing); return;}
    if (missing2) start = new Date(); else start = new Date(start_time);

    // apparently we're using a "subcollection"
    let sleepRef = usersCollection.doc(uid).collection('sleeps').doc();
    
    let sleepInfo = {start: start, in_progress: true};
    sleepRef.set(sleepInfo);
    res.send('started sleep');

});

app.post('/sleeps/end', async (req, res) => {
    let [missing, [uid]] = retr(req.body, ['uid']);
    let [missing2, [end_time]] = retr(req.body, ['currTime']);
    if (missing) {res.send(str_missing); return;}
    if (missing2) end = new Date(); else end = new Date(end_time);

    const sleepCollection = usersCollection.doc(uid).collection('sleeps');
    // find the single most recent in_progress sleep
    const sleeps = await sleepCollection.where('in_progress', '==', true).orderBy('start', "desc").limit(1).get()
        .catch(e => {res.send(e); return;});
    let sleep = {};
    let s_id = null;
    sleeps.docs.map(doc => {
        sleep = doc.data();
        s_id = doc.id;
        sleep.start = sleep.start.toDate(); // this makes it a js Date; but do whatever format
    });
    // now update!
    sleep.end = end;
    sleep.in_progress = false;
    // if somehow no sleeps in progress, make a new one and end it
    if (s_id === null) sleepCollection.doc().set({start: end, ...sleep});
    // otherwise update sleep as expected
    else sleepCollection.doc(s_id).set(sleep);

    res.send('successfully ended a sleep');
});

app.get('/sleeps', async (req, res) => {
    const uid = req.query.uid;
    if (!uid) {res.send(str_missing); return;}
    const num_results = req.query.num_results;
    
    // retrieve most-recently-started sleeps for a user
    let sleepCollection = usersCollection.doc(uid).collection('sleeps').orderBy('end', 'desc');
    // if given a number of results to return, set that limit
    // if (typeof num_results !== 'undefined') console.log('using limit '.concat(num_results));
    if (typeof num_results !== 'undefined') sleepCollection = sleepCollection.limit(parseInt(num_results));

    // retrieve and return list
    const sleepsObj = await sleepCollection.get();
    const sleeps = [];
    for (let doc of sleepsObj.docs) {
        let sleep = doc.data();
        sleep.sid = doc.id;
        sleep.start = sleep.start.toDate(); // this makes it a js Date
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

app.listen(process.env.PORT || 8080, function () { console.log('app started - go to http://localhost:8080/') });

// todo -> stuff from latest lecture
// todo -> catch/handle errors lmao