import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SleepTable from './SleepTable';
import SleepButton from './SleepButton';
import Stats from './Stats';
import { isNull } from 'util';
import SleepChart from './SleepChart';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default ({uid}) => {

    const url = "https://morning-waters-80542.herokuapp.com";

    const[sleeps, setSleeps] = useState([]);
    // const[sleeps, setSleeps] = useState([
    //     {start: "2020-04-20T04:44:48.697Z", end: "2020-04-20T06:44:48.697Z", sid: "aaa"},
    //     {start: "2020-04-21T01:44:48.697Z", end: "2020-04-21T06:44:48.697Z", sid: "b"},
    //     {start: "2020-04-22T02:44:48.697Z", end: "2020-04-22T06:44:48.697Z", sid: "abaa"},
    //     {start: "2020-04-23T03:44:48.697Z", end: "2020-04-23T06:44:48.697Z", sid: "aaca"},
    //     {start: "2020-04-24T05:44:48.697Z", end: "2020-04-24T06:44:48.697Z", sid: "aada"},
    //     {start: "2020-04-25T05:20:48.697Z", end: "2020-04-25T06:44:48.697Z", sid: "aaea"},
    //     {start: "2020-04-26T05:10:48.697Z", end: "2020-04-26T06:44:48.697Z", sid: "aaaa"},
    //     {start: "2020-04-27T02:50:48.697Z", end: "2020-04-27T06:44:48.697Z", sid: "aafa"},
    //     {start: "2020-04-28T01:44:48.697Z", end: "2020-04-28T06:53:48.697Z", sid: "bbub"}
    // ]);

    const fetchSleeps = () => {
        if (uid==="") return;
        console.log(`fetchSleeps: uid is ${uid}`);
        // // console.log('would be fetching sleeps');
        // console.log(`fetching sleeps for ${uid}`);
        // axios.get(`/sleeps?uid=${uid}`)   
        axios.get(`${url}/sleeps?uid=${uid}&num_results=7`)
            .then(res => {if (res.data.filter)
                    setSleeps(
                res.data.filter(
                    s => !s.in_progress
                )
                .sort((a, b) => new Date(a.end) - new Date(b.end))
                )})
            .then(console.log('fetched sleeps'))
            .catch(err => {console.log(err)});
    }
    useEffect(() => fetchSleeps(), [uid]);

    const sleepDurations = sleeps.map(s => ((new Date(s.end) - new Date(s.start)) / (1000*3600)));

    const [sleeping, setSleeping] = useState(null);
    const fetchSleepingStatus = () => {
        if (!isNull(sleeping)) return;
        if (uid==="") return; 
        console.log('fetching status');
        axios.get(`${url}/sleeps/inprogress?uid=${uid}`)
                .then(res => setSleeping(res.data))
                .catch(e => console.log(`error: ${e}`))
    }
    useEffect(() => fetchSleepingStatus(), [uid]);

    return (
        <div>
            {/* start/end button conditionally displays here */}
            <SleepButton uid={uid} setSleeping={setSleeping} sleeping={sleeping} fetch={fetchSleeps} />
            <br />

            {!sleeping && <Container fluid>
                <Row>
                    <Col>
                        {/* graph goes here */}
                        <SleepChart sleeps = {sleeps}/>
                    </Col>
                    <Col>
                        {/* previous sleeps goes here */}
                        <SleepTable uid={uid} sleeps={sleeps} updateData={setSleeps}/>
                    </Col>
                </Row>
            </Container>}

            {/* statistics goes here */}
            {sleepDurations.length >= 1 && !sleeping && <Stats sleepTimes={sleepDurations}/> }

        </div>
    );
};