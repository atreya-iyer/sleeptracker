
import DatePicker from "react-datepicker";
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";

// see https://www.npmjs.com/package/react-datepicker 
// and https://reactdatepicker.com

export default ({time, update}) => {

  return (
    <DatePicker
        selected={time}
        onChange={t => update(t.toString())}

        className="time-border"

        timeIntervals={1}
        showTimeSelect

        // timeInputLabel="Time:"
        // showTimeInput
        todayButton="Today"
        openToDate={time}
        dateFormat="MM/dd/yyyy h:mm aa"
        
        // withPortal

        popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px"
            },
            preventOverflow: {
              // enabled: true,
              escapeWithReference: false,
              boundariesElement: "viewport"
            }
        }}
        shouldCloseOnSelect={false}
        // onCalendarClose={handleCalendarClose} update automatically?
    />
  );
}