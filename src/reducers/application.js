const SET_DATA = 'SET_DATA';
const BOOK = 'BOOK';
const CANCEL = 'CANCEL';
const SET_DAY = 'SET_DAY';
const SET_INTERVIEW = 'SET_INTERVIEW';


// reducer function switch to set appointments/days/interviews state 
export function reducer(state, action) {

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
      return { ...state, days, appointments, interviewers };
    }
    case SET_INTERVIEW: {
      const { interview, id, days } = action;
      const appointments = { ...state['appointments'] };
      appointments[`${id}`].interview = interview;
      return { ...state, appointments, days };
    }
    default:
      throw new Error(`Tried to reduce with unsupported action type`);
  }
};

export {
  SET_DATA,
  BOOK,
  CANCEL, 
  SET_DAY
}

