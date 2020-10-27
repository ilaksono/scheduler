import React from 'react';
import DayListItem from './DayListItem.js';
export default function DayList(p) {
  const days = p.days
  const parsedDays = days.map((day, index) => {
    return(
      <DayListItem name={day.name}
      spots={day.spots}
      selected={p.day === day.name}
      setDay={p.setDay}
      key={index}
      />
    )
  })
  return (
    <ul>
      {parsedDays}
    </ul>
  );
}