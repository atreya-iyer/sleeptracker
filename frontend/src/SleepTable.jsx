import Sleep from './Sleep';
import React from 'react';



export default (sleeps) => {
    sleeps = [
        {start: "2020-04-28T05:44:48.697Z", end: "2020-04-28T06:44:48.697Z", sleepid: "UTgRLkz5TbBOSFRssBmA"}
    ];
    const updateSleep = () => {
        // const currTime = new Date();
        // if (sleeping===true) {
        //     axios.post('/sleeps/start', {uid, currTime})
        //         .then(res => setSleeping(true));
        // } else {
        //     axios.post('/sleeps/end', {uid, currTime})
        //         .then(res => setSleeping(false));
        // }
        // axios.put('/sleeps/'+id, )
    };

    // oh ok yeah
    //nah dog feel free to correct me
    //idk what im doing
    return (
        <div>
            {sleeps.map(s => (<div> <Sleep st={s.start} e={s.end} key={s.sleepid} /> </div>))}
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
        </div>
    );
};