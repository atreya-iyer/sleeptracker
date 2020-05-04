import React from 'react';
import axios from 'axios';
import Sleep from './Sleep';



export default ({uid, sleeps, updateData}) => {
    const url = "https://morning-waters-80542.herokuapp.com";

    const updateSleep = (sid, st, en) => {
        // step 1: make put request
        console.log(`PUT update for ${sid}`);
        axios.put(`${url}/sleeps/${sid}`, {start:st, end:en, uid})
        // step 2: update local state
        .then(r => {
            console.log(r.data);
            updateData(sleeps.map(s => s.sid === sid ? {...s, start: st, end: en} : s));
        });
    };


    return (
        <div className="past-sleeps">
          <h2>Past sleeps</h2>
            {sleeps.slice(0).reverse().map(s => (<div> <Sleep st={s.start} en={s.end} key={s.sid} sid={s.sid} callback={updateSleep} /> </div>))}
        </div>
    );
};

