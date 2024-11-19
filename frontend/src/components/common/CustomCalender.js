import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CustomCalendar({value,onChange}) {
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default CustomCalendar;