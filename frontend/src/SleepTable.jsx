import React from 'react';
import axios from 'axios';

import Sleep from './Sleep';



export default ({uid, sleeps, updateData}) => {


    const updateSleep = (sid, st, en) => {
        // step 1: make put request
        // axios.put(`/sleep/{sid}`, {start:st, end:en, uid})
        
        // step 2: update local state
        // .then(res => {
            updateData(sleeps.map(s => s.sid === sid ? {...s, start: st, end: en} : s));
        // });
    };


    return (
        <div className="past-sleeps">
          <h2>Past sleeps</h2>
            {sleeps.map(s => (<div> <Sleep st={s.start} en={s.end} key={s.sid} sid={s.sid} callback={updateSleep} /> </div>))}
        </div>
    );
};

            {/* {sleeps} */}
            {/* {sleeps.map(s => <Sleep />)} */}
            {/* {sleeps.map(s => (<div> <Sleep {...s} /> </div>))} */}

            {/* <table>
                <thead>
                    <tr>
                        <th colSpan="3">All Sleeps</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Sleep /></td>
                        <td><Sleep /></td>
                        <td><button type="button" onclick={updateSleep}>Update</button></td> 
                    </tr>
                </tbody>
            </table> */}