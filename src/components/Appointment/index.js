import React from 'react';
import './styles.scss';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import useVisualMode from "hooks/useVisualMode";
// import Error from './Error';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
export default function Appointment(p) {
  const { student, interviewer } = p.interview || {};

  const { mode, transition, back } = useVisualMode(p.interview ? SHOW : EMPTY);
  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    }
    p.bookInterview(p.id,interview)
      .then(() => transition(SHOW));
  }
  const disConfirm = () => {
    transition(CONFIRM);
  }
  const cancelConfirm = () => {
    // transition(DELETING);

  }
  const deleteInterview = (id) => {
    transition(DELETING);
    p.cancelInterview(id)
    .then(() => transition(EMPTY));
  }
  return (
    <article className="appointment">
      <Header id={p.id} time={p.time} />
      {/* {p.interview ? <Show student={student} interviewer={interviewer}/> : <Empty/>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={interviewer}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && <Form onCancel={back} onSave={save} interviewers={p.interviewers}/>}
        {mode === SAVING && <Status message='Saving'/>}
        {mode === DELETING && <Status message='Deleting'/>}
        {mode === CONFIRM && <Status onCancel={cancelConfirm} onConfirm={deleteInterview}/>}
    </article>
  );
}