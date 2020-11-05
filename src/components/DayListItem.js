import React from "react";
import './DayListItem.scss';
const classNames = require('classnames');

export default function DayListItem(p) {
  const dayClass = classNames('day-list__item', {'day-list__item--selected': p.selected, 'day-list__item--full': p.spots === 0 });
  const formatSpots = (spots) => {
    if( spots === 0) return 'no spots remaining';
    else if( spots === 1) return `1 spot remaining`;
    else return `${spots} spots remaining`;

  }
  
  return (
    <li data-testid='day' className={dayClass} onClick={() => p.setDay(p.name)}>
      <h2 className="text--regular">{p.name}</h2> 
      <h3 className="text--light">{formatSpots(p.spots)}</h3>
    </li>
  );
}