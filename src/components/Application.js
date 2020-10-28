import React, { useState, useEffect } from "react";
import axios from 'axios';
import Appointment from './Appointment';
import "components/Application.scss";
import DayList from './DayList';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const bookInterview = (id, interview) => {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({ ...state, appointments });
    return axios({ method: 'put', data: { interview }, url: `/api/appointments/${id}` })
      .then(response => {
        console.log(response);
      });
  };
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios({ method: 'delete', url:`/api/appointments/${id}`})
    .then(() => setState({...state, appointments}));

  };



  useEffect(() => {
    const p1 = axios.get('/api/days');
    const p2 = axios.get('/api/appointments');
    const p3 = axios.get('/api/interviewers');
    Promise.all([p1, p2, p3])
      .then(all => {
        console.log(all);
        setState(prev => ({ ...prev, days: [...all[0].data], appointments: { ...all[1].data }, interviewers: { ...all[2].data } }));
      });
  }, []);
  const interviewers = getInterviewersForDay(state, state.day);
  const dayAppointments = getAppointmentsForDay(state, state.day);
  const parsedApps = dayAppointments.map(appointment => {
    let interview = null;
    if (appointment.interview)
      interview = getInterview(state, appointment.interview);
    return <Appointment key={appointment.id} bookInterview={bookInterview} cancelInterview={cancelInterview} id={appointment.id} time={appointment.time} interview={interview} interviewers={interviewers} />;
  });
  parsedApps.push(<Appointment key="last" time="5pm" />);
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedApps}
      </section>
    </main>
  );
}
