import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CustomTimePicker from './CustomTimePicker'

export default ({st, en, sid, callback}) => {
    let [start, updateStart] = useState(st);
    let [end, updateEnd] = useState(en);        
        
    return (
        <div>
            <br />
            From &nbsp;
            <CustomTimePicker time={new Date(start)} update={updateStart} />
            {/* <input id="start" type="text" value={start} placeholder={start} onChange={e => updateStart(e.target.value)}/> */}
            &nbsp; to &nbsp;
            <CustomTimePicker time={new Date(end)} update={updateEnd} />
            {/* <input id="end" type="text" value={end} placeholder={end} onChange={e => updateEnd(e.target.value)}/> */}
            &nbsp;
            ({((new Date(end) - new Date(start)) / (1000*3600)).toFixed(1)} hours)
            &nbsp;
            <button onClick={e => callback(sid, start, end)}>Update</button>
            <br />
        </div>
    );
};


// export default ({callback, name, artist, rating, id}) => {
//     const [newRating, setNewRating]  = useState(0);
//     return (
//         <div>
//             Song {name} by {artist} w rating {rating}
//             <input placeholder="New Rating" onChange={e => setNewRating(e.target.value)} />
//             <button onClick={e => callback(id, newRating)}>Update rating</button>
//         </div>
//     );
// };  );
//};



