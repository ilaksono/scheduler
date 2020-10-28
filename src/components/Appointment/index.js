import React, { useState } from 'react';
import './styles.scss';
import Empty from './Empty';
import Header from './Header';
import Show from './Show';
import useVisualMode from "hooks/useVisualMode";
import Error from './Error';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(p) {
  const { student, interviewer } = p.interview || {};
  const { mode, transition, back } = useVisualMode(p.interview ? SHOW : EMPTY);
  const [errMsg, setErrMsg] = useState('');
  const save = (name, inter) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer: inter
    };
    p.bookInterview(p.id, interview)
      .then(() => transition(SHOW))
      .catch(() => {
        setErrMsg('Could not save');
        transition(ERROR_SAVE, true);
      });
  };

  const disConfirm = () => transition(CONFIRM);
  const cancelConfirm = () => transition(SHOW);

  const destoy = (id) => {
    transition(DELETING, true);
    p.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => {
        setErrMsg('Could not delete');
        transition(ERROR_DELETE, true);
      });
  };

  const errorClose = () => {
    back();
    back();
  };
  const edit = () => transition(EDIT);
  const msg = 'Are you sure you would like to delete?';
  return (
    <article className="appointment">
      <Header id={p.id} time={p.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={interviewer}
          onDelete={disConfirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && <Form onCancel={back} onSave={save} interviewers={p.interviewers} />}
      {mode === SAVING && <Status message='Saving' />}
      {mode === DELETING && <Status message='Deleting' />}
      {mode === CONFIRM && <Confirm id={p.id} onCancel={cancelConfirm} message={msg} onConfirm={destoy} />}
      {mode === EDIT && <Form name={student} interviewer={interviewer.id} onCancel={back} onSave={save} interviewers={p.interviewers} />}
      {mode === ERROR_SAVE && <Error message={errMsg} onClose={errorClose} />}
      {mode === ERROR_DELETE && <Error message={errMsg} onClose={errorClose} />}

    </article>
  );
}