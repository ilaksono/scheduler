import React from 'react';
import './styles.scss';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import useVisualMode from "hooks/useVisualMode";
// import Error from './Error';
import Form from './Form';
// import Status from './Status';
// import Confirm from './Confirm';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

export default function Appointment(p) {
  const { student, interviewer } = p.interview || {};

  const { mode, transition, back } = useVisualMode(p.interview ? SHOW : EMPTY);
  
  return (
    <article className="appointment">
      <Header id={p.id} time={p.time} />
      {/* {p.interview ? <Show student={student} interviewer={interviewer}/> : <Empty/>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={interviewer}
        />
      )}
      {mode === CREATE && <Form onCancel={back} interviewers={p.interviewers}/>}

    </article>
  );
}