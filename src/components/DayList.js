import React from 'react';
import DayListItem from './DayListItem.js';
export default function DayList(props) {
  const days = props.days
  const parsedDays = days.map((day, index) => {
    return(
      <DayListItem name={day.name}
      spots={day.spots}
      selected={props.day === day.name}
      setDay={props.setDay}
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