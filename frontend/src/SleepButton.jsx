import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

export default ({uid, setSleeping, sleeping, fetch}) => {
        
    const changeSleepStatus = () => {
        const currTime = new Date();
        if (sleeping===false) {
            axios.post('https://sleeptracker-7640d.web.app/sleeps/start', {uid, currTime})
                .then(
                    console.log('sleeping!')
                )
                .catch (e => console.log(`error: ${e}`));
                //         .then(res => setSleeping(true));
            } else {
                axios.post('https://sleeptracker-7640d.web.app/sleeps/end', {uid, currTime})
                .then(
                    console.log('not sleeping!')
                )
                .then(setTimeout(() => fetch(), 1000))
                // .then(fetch())
                .catch (e => console.log(`error: ${e}`));
                //         .then(res => setSleeping(false));
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