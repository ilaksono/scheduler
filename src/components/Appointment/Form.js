import React,{useState} from 'react';
import { Button } from '../Button';
import InterviewerList from '../InterviewerList';

export default function Form(p) {
  const reset = () => {
    setName('');
    setInterviewer(null);
  }
  const cancel = () => {
    p.onCancel();
    reset();
  }
  const [name, setName] = useState(p.name || '');
  const [interviewer, setInterviewer] = useState(p.interviewer || null);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <InterviewerList interviewers={p.interviewers} value={interviewer} onChange={setInterviewer}  />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => p.onSave(name, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}