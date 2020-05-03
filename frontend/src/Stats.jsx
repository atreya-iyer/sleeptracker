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
            Mean: {mean.toFixed(1)} <br />
            Median: {median.toFixed(1)} <br />
            Minimum: {min.toFixed(1)} <br />
            Maximum: {max.toFixed(1)} <br />
            Standard Deviation: {sd.toFixed(2)}
        </div>
    );
};