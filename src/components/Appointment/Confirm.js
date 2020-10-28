import React from 'react';
import {Button} from '../Button';
 
export default function Confirm(p) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{p.message}</h1>
      <section className="appointment__actions">
        <Button onClick={p.onCancel} danger>Cancel</Button>
        <Button onClick={() => p.onConfirm(p.id)} danger>Confirm</Button>
      </section>
    </main>
  );
}