import React from 'react';
import './styles.scss';
import Error from './Error';
import Form from './Form';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(p) {
  const {student, interviewer} = p.interview || {};
  return (
    <article className="appointment">
    <Header id={p.id} time={p.time}/>
    {p.interview ? <Show student={student} interviewer={interviewer}/> : <Empty/>}
    </article>
  );
}