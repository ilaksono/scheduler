import { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios({ method: 'put', data: { interview }, url: `/api/appointments/${id}` })
      .then(() => axios.get('/api/days')
        .then(data => setState({ ...state, appointments, days: data.data }))
      );
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

    return axios({ method: 'delete', url: `/api/appointments/${id}` })
      .then(() => axios.get('/api/days'))
      .then(data => {
        setState({ ...state, appointments, days: data.data });
      });

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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

};

export default useApplicationData;