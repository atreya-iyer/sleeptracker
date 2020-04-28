import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SleepTable from './SleepTable';
import SleepButton from './SleepButton';
import { isNull } from 'util';

export default ({uid}) => {
    // make get requests here?
    const[sleeps, setSleeps] = useState([]);
    const fetchSleeps = () => {
        axios.get('/sleeps?uid='.concat(uid))   // would concat limit here
        .then(res => setSleeps(res.data));
        
    }

    const [sleeping, setSleeping] = useState(null);
    const fetchSleepingStatus = () => {
        if (!isNull(sleeping)) return;
        if (uid==="") return; 
        axios.get('/sleeps/inprogress?uid='.concat(uid))
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
            <SleepTable sleeps={[]}/>

            {/* graph goes here */}

            {/* statistics goes here */}
        </div>
    );
};