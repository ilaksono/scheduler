import React from 'react';
import './InterviewerListItem.scss';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';



export default function InterviewerList(props) {
    const ints = props.interviewers;
    const intsParsed = ints.map((inter) => {
      return(
        <InterviewerListItem 
        key={inter.id} 
        name={inter.name} 
        avatar={inter.avatar}
        setInterviewer={(event) => props.setInterviewer(inter.id)}
        selected={inter.id === props.interviewer}/>
      )
    })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{intsParsed}</ul>
    </section>
  );
}