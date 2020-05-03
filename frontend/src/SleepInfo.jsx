import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SleepTable from './SleepTable';
import SleepButton from './SleepButton';
import Stats from './Stats';
import { isNull } from 'util';
import SleepChart from './SleepChart';

export default ({uid}) => {
    // make get requests here?
    const[sleeps, setSleeps] = useState([
        {start: "2020-04-20T04:44:48.697Z", end: "2020-04-20T06:44:48.697Z", sid: "aaa"},
        {start: "2020-04-21T01:44:48.697Z", end: "2020-04-21T06:44:48.697Z", sid: "aaa"},
        {start: "2020-04-22T02:44:48.697Z", end: "2020-04-22T06:44:48.697Z", sid: "aaa"},
        {start: "2020-04-23T03:44:48.697Z", end: "2020-04-23T06:44:48.697Z", sid: "aaa"},
        {start: "2020-04-24T05:44:48.697Z", end: "2020-04-24T06:44:48.697Z", sid: "aaa"},
        {start: "2020-04-25T05:20:48.697Z", end: "2020-04-25T06:44:48.697Z", sid: "aaa"},
        {start: "2020-04-26T05:10:48.697Z", end: "2020-04-26T06:44:48.697Z", sid: "aaa"},
        {start: "2020-04-27T02:50:48.697Z", end: "2020-04-27T06:44:48.697Z", sid: "aaa"},
        {start: "2020-04-28T01:44:48.697Z", end: "2020-04-28T06:53:48.697Z", sid: "bbb"}
    ]);

    const fetchSleeps = () => {
        // console.log('uid is '.concat(uid));
        // if (uid==="") return;
        // // console.log('would be fetching sleeps');
        // console.log('fetching sleeps');
        // axios.get('/sleeps?uid='.concat(uid))   // would concat limit here
        //     .then(res => setSleeps(
        //         res.data
        // //         // res.data.map(
        // //         //     s => {...s, start: new Date(s.start)}
        //         // )
        // ))
        //     .then( res =>
        // {console.log('sleeps are');
        // console.log(sleeps);}
        //     )
        // .catch(err => {console.log(err)});
    }
    useEffect(() => fetchSleeps(), [uid]);

    const sleepDurations = sleeps.map(s => ((new Date(s.end) - new Date(s.start)) / (1000*3600)));

    const [sleeping, setSleeping] = useState(null);
    const fetchSleepingStatus = () => {
        if (!isNull(sleeping)) return;
        if (uid==="") return; 
        axios.get(`/sleeps/inprogress?uid={uid}`)
                .then(res => setSleeping(res.data));
        console.log('fetching status');
    }
    useEffect(() => fetchSleepingStatus(), [uid]);

    return (
        <div>
            {/* sleep info for {uid} */}
            {/* start/end button conditionally displays here */}
            <SleepButton uid={uid} setSleeping={setSleeping} sleeping={sleeping} />

            {/* previous sleeps goes here */}
            {!sleeping && <SleepTable uid={uid} sleeps={sleeps} updateData={setSleeps}/>}

            {/* graph goes here */}

            {/* statistics goes here */}
            {sleepDurations.length >= 1 && !sleeping && <Stats sleepTimes={sleepDurations}/> }

            {<SleepChart sleeps = {sleeps}/>}
        </div>
    );
};