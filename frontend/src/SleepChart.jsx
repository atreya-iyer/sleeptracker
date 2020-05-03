import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts';

export default ({sleeps}) => {
    const data = sleeps.map(s => {return {"date":new Date(s.end).getMonth().toString()
    + "/" + new Date(s.end).getDate().toString() + "/" + new Date(s.end).getFullYear().toString(),
    "blank":"",
    "amt":((new Date(s.end) - new Date(s.start)) / (1000*3600))}});
    
    function CustomTooltip({ payload, label, active }) {
        if (active) {
            return (
                <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
          );
        }
        //  check texts
      
        return null;
      }

    return (
        <div style={{
            position: 'absolute', left: '50%',
            transform: 'translate(-50%)'
        }}>
        <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }} >

        
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content = {<CustomTooltip />}/>
        <Area type="monotone" dataKey="amt" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      </div>
        
    )
}