import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  } from 'recharts';

export default ({sleeps}) => {
    const sleepTimes = sleeps.map(x => ((new Date(x.end) - new Date(x.start)) / (1000*3600)).toFixed(2));
    const data = sleeps.map(s => {return {"date":(new Date(s.end).getMonth()+1).toString()
    + "/" + new Date(s.end).getDate().toString() + "/" + new Date(s.end).getFullYear().toString(),
    "blank":"",
    "amt":((new Date(s.end) - new Date(s.start)) / (1000*3600)).toFixed(2)}});
    
    const CustomTooltip = ({ payload, label, active }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
              <p className="label">{`${label} : ${payload ? payload[0].value : ""}`}</p>
            </div>
          );
        }
        //  check texts
      
        return null;
      }

    return (
        <div style={{
            position: 'relative', left: '50%',
            transform: 'translate(-50%)'
        }}>
        <AreaChart
        width={600}
        height={500}
        data={data} >

        
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis type="number" domain={[0,Math.max(...sleepTimes)]}/> 
        <Tooltip content = {<CustomTooltip />}/>
        <Area type="monotone" dataKey="amt" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      </div>
        
    )
}