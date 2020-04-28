import React, { useState, useEffect } from 'react';
const stats = require('simple-statistics');

//pass in duration
export default ({sleepTimes}) => {

    // (sleep.end - sleep.start) / (1000*3600); // in hours
    // map this ^ ?
    //oh i ddint thnk it would compile
// i think what you had before was fine, in slepinfo
    const mean = sleepTimes.length >= 1 ? stats.mean(sleepTimes) : 0;
    const median = stats.median(sleepTimes);
    const min = stats.min(sleepTimes);
    const max = stats.max(sleepTimes);
    const sd = stats.standardDeviation(sleepTimes);
    return (
        <div>
            Mean: {mean} <br />
            Median: {median} <br />
            Minimum: {min} <br />
            Maximum: {max} <br />
            Standard Deviation: {sd}
        </div>
    );
};