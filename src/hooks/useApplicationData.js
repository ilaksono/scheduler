import { useEffect, useReducer } from "react";
import axios from 'axios';
import { reducer, SET_DATA, SET_DAY, CANCEL, BOOK } from 'reducers/application.js';
// const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
const socket = new WebSocket('ws://localhost:8001');

socket.onopen = () => {
  socket.send('ping');
};

const initData = {
  day: 'Monday',
  days: [],
  appointments: {},
  interviewers: {}
};

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initData);
  useEffect(() => {
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
      });
  }, []);

  useEffect(() => {
    socket.addEventListener('message', function (event) {
      const update = JSON.parse(event.data);
      if (update.type) {
        const { interview, id } = update;
        axios.get('api/days')
          .then(data => dispatch({ type: update.type, interview, id, days: data.data }));
      }
    });
  }, []);
  function setDay(day) {
    dispatch({ type: SET_DAY, day });
  }
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
      .then(() => axios.get('/api/days').then(data => {
        dispatch({
          type: BOOK,
          appointments,
          days: data.data
        });
        // socket.send('CREATE');
        return state;
      }));
  };
  function cancelInterview(id) {
    const appointment =
      { ...state.appointments[id], interview: null };
    const appointments =
      { ...state.appointments, [id]: appointment };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        return axios.get('/api/days');
      }).then(data => {
        dispatch({
          type: CANCEL,
          appointments,
          days: data.data
        });
        return state;
      });
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

};