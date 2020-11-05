import { useEffect, useReducer } from "react";
import axios from 'axios';
import { reducer, SET_DATA, SET_DAY, CANCEL, BOOK } from 'reducers/application.js';

const initData = {
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {}
};

// hook to dispatch appointments, days, interviewers state using reducer
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initData);
  useEffect(() => { // on mount, api call to load from database
    const p1 = axios.get('/api/days');
    const p2 = axios.get('/api/appointments');
    const p3 = axios.get('/api/interviewers');
    Promise.all([p1, p2, p3])
      .then(all => {
        dispatch({
          type: SET_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      })
      .catch(er => console.log(er));
  }, []);

  useEffect(() => { // on mount - add websocket listener to trigger render on update
    const baseURL = process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8001';
    const socket = new WebSocket(baseURL);
    socket.onopen = () => {
      socket.send('ping');
    };
    socket.addEventListener('message', function (event) {
      const update = JSON.parse(event.data);
      if (update.type) { // check type of parsed message to filter messages
        const { interview, id } = update;
        axios.get('api/days')
          .then(data => dispatch({ type: update.type, interview, id, days: data.data }))
          .catch(er => console.log(er));
      }
    });
    return () => socket.close();
  }, []);
  const setDay = day => dispatch({ type: SET_DAY, day });

  // create appointments copy, then dispatch
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => axios.get('/api/days') // axios request to update days before rendering
        .then(data => {
          dispatch({
            type: BOOK,
            appointments,
            days: data.data
          })
            .catch(er => console.log(er));
          return state;
        })).catch(err => console.log(err));
  };

  // create appointments copy with deleted app,
  // then dispatch
  function cancelInterview(id) {
    const appointment =
      { ...state.appointments[id], interview: null };
    const appointments =
      { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        // axios request to update days before rendering
        return axios.get('/api/days'); 
      }).then(data => {
        dispatch({
          type: CANCEL,
          appointments,
          days: data.data
        });
        return state;
      })
      .catch(er => console.log(er));
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

};