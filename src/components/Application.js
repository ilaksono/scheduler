import React from "react";
import Appointment from './Appointment';
import "components/Application.scss";
import DayList from './DayList';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from 'hooks/useApplicationData';
export default function Application() {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
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
         {state.day && <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        }
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
