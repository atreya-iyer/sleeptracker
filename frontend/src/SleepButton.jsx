import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';


export default ({uid, setSleeping, sleeping, fetch}) => {
    const url = "https://morning-waters-80542.herokuapp.com";
        
    const changeSleepStatus = () => {
        const currTime = new Date();
        if (sleeping===false) {
            axios.post(`${url}/sleeps/start`, {uid, currTime})
                .then(
                    console.log('sleeping!')
                )
                .catch (e => console.log(`error: ${e}`));
                //         .then(res => setSleeping(true));
            } else {
                axios.post(`${url}/sleeps/end`, {uid, currTime})
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