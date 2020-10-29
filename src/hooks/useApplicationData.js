import { useEffect, useReducer } from "react";
import axios from 'axios';

const SET_DATA = 'SET_DATA';
const BOOK = 'BOOK';
const CANCEL = 'CANCEL';
const SET_DAY = 'SET_DAY';

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return { ...state, day: action.day };
    }
    case BOOK: {
      const { appointments, days } = action;
      return { ...state, appointments, days };
    }
    case CANCEL: {
      const { appointments, days } = action;
      return ({ ...state, appointments, days });
    }
    case SET_DATA: {
      const { days, appointments, interviewers } = action;
      console.log(action);
      return { ...state, days, appointments, interviewers };
    }
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
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
          type: 'SET_DATA',
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      });
  }, []);
  function setDay(day) {
    dispatch({ type: 'SET_DAY', day });
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
    return axios({ method: 'put', data: { interview }, url: `/api/appointments/${id}` })
      .then(() => axios.get('/api/days').then(data => {
        dispatch({
          type: 'BOOK',
          appointments,
          days: data.data
        });
        return state;
      }));
  };
  function cancelInterview(id) {
    const appointment =
      { ...state.appointments[id], interview: null };
    const appointments =
      { ...state.appointments, [id]: appointment };
    return axios({ method: 'delete', url: `/api/appointments/${id}` })
      .then(() => {
        return axios.get('/api/days');
      }).then(data => {
        dispatch({
          type: 'CANCEL',
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