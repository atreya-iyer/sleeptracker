import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({st, e, sleepid}) => {
    let [start, updateStart] = useState(st);
    let [end, updateEnd] = useState(e);
    const callback = (st, en) => {
        //wait i just realized the function i set up in index requires the 
        //sleep id, and then the start and end are passed in the request body
        //how do i get the uid
        //should we instead pass start and end up to table, and table sends the request with the id?
        // axios.put('/sleep/:id', {st, en})
    };
    return (
        <div>
                    {/* // date select:
                    // https://www.npmjs.com/package/react-datepicker maybe?
                    // let's display first and edit later
                    //i feel like thats the wrong onchange, what are ur thoughts
                        it looks fine other than not updating the database
                        which i don't feel brave enough to try
                        that will be in the onClick, right?
                        oh yeah i guesss */}
            {/* from {start} to {end}  */}
            <input id="start" type="datetime-local" value={start} placeholder={start} onChange={updateStart}/>
            <input id="end" type="text" value={end} placeholder={end} onChange={updateEnd}/>
            <button onClick={e => callback(start, end)}>Update</button>
        </div>
        // i think this looks fine
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



