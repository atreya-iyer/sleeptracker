import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SleepTable from './SleepTable';
import SleepButton from './SleepButton';
import Stats from './Stats';
import { isNull } from 'util';

export default ({uid}) => {
    // make get requests here?
    const[sleeps, setSleeps] = useState([
        {start: "2020-04-28T05:44:48.697Z", end: "2020-04-28T06:44:48.697Z", sid: "aaa"},
        {start: "2020-04-26T05:44:48.697Z", end: "2020-04-26T06:44:48.697Z", sid: "bbb"}
    ]);

    // const fetchSleeps = () => {
    //     axios.get('/sleeps?uid='.concat(uid))   // would concat limit here
    //     .then(res => setSleeps(res.data.map(
    //         s => {...s, start: new Date(s.start)}
    //     )));
    // }

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
    // console.log(isNull(sleeping));
    // if (isNull(sleeping)) {
    //     fetchSleepingStatus();
    // }
    // fetchSleepingStatus();


    return (
        <div>
            sleep info for {uid}
            {/* start/end button conditionally displays here */}
            <SleepButton uid={uid} setSleeping={setSleeping} sleeping={sleeping} />

            {/* previous sleeps goes here */}
            {!sleeping && <SleepTable uid={uid} sleeps={sleeps} updateData={setSleeps}/>}

            {/* graph goes here */}

            {/* statistics goes here */}
            {sleepDurations.length >= 1 && !sleeping && <Stats sleepTimes={sleepDurations}/> }
        </div>
    );
};