import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

export default ({uid, setSleeping, sleeping}) => {
        
    const changeSleepStatus = () => {
        const currTime = new Date();
        if (sleeping===false) {
        //     axios.post('/sleeps/start', {uid, currTime})
        //         .then(res => setSleeping(true));
            console.log('sleeping!')
        } else {
            //     axios.post('/sleeps/end', {uid, currTime})
            //         .then(res => setSleeping(false));
            console.log('not sleeping!')
        }
        setSleeping(!sleeping);
    };

    return (
        <div>
            <Button color={sleeping ? "success" : "secondary"} onClick={changeSleepStatus}>
                {sleeping ? "wake up" : "start sleeping"} 
            </Button>
            {/* Song {name} by {artist} w rating {rating}
            <input placeholder="New Rating" onChange={e => setNewRating(e.target.value)} />
            <button onClick={e => callback(id, newRating)}>Update rating</button> */}
        </div>
    );
};

// https://reactstrap.github.io/components/buttons/