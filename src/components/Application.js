import React, { useState, useEffect } from "react";
import axios from 'axios';
import Appointment from './Appointment';
import "components/Application.scss";
import DayList from './DayList';
import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application() {
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {}

  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  useEffect(() => {

    const p1 = axios
      .get('/api/days');
    // .then(response => {
    //   console.log(response.data);
    //   setDays(response.data);
    // });
    const p2 = axios
      .get('/api/appointments');
    // .then(response => {
    //   console.log(response.data);
    //   setDays(response.data);
    // });
    const p3 = axios.get('/api/interviewers');
    Promise.all([p1, p2, p3])
      .then(all => {
        console.log(all);
        setState(prev => ({ ...prev, days: [...all[0].data], appointments: { ...all[1].data } }));
        // console.log(all[0]);
        // console.log(all[1]);
        // console.log(all[2]);
      });
  }, []);
  // const dailyAppointments = [];

  const dayAppointments = getAppointmentsForDay(state, state.day);
  const parsedApps = dayAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />);
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
