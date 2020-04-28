import React, { useState, useEffect } from 'react';
const stats = require('simple-statistics');

//pass in duration
export default (sleepTimes) => {

    const mean = stats.mean(sleepTimes);
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