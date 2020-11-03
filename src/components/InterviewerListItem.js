import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss'
export default function InterviewerListItem(p) {
  const liClassName = classNames('interviewers__item',{'interviewers__item--selected':p.selected});
  return (
    <li className={liClassName} onClick={p.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={p.avatar}
        alt={p.name}
        onClick={() => p.setErrMsg('')}
        data-testid='int-img'
      />
      {p.selected && p.name}
    </li>
  );
}