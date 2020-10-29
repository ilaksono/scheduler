export const getAppointmentsForDay = (state, dayName) => {
  let filteredDay = [];
  if (state.day) {
    filteredDay = state.days
      .filter(day => day.name === dayName) || [];
  }
  let filteredApps = [];
  if (filteredDay[0]) {
    filteredApps = filteredDay[0].appointments
      .map(appointmentId => state.appointments[`${appointmentId}`]);
  }
  return filteredApps;
};

export const getInterview = (state, interview) => {
  let interviewerJson = {};
  let interviewJson = {};
  let interviewerID;
  if (interview) {
    interviewerID = interview.interviewer;
    interviewerJson = Object.values(state.interviewers).filter(val => val.id === interviewerID)[0];
    interviewJson = {
      student: interview.student,
      interviewer: { ...interviewerJson }
    };
    return interviewJson;
  }
  return null;
};
export const getInterviewersForDay = (state, dayName) => {
  let filteredDay=[];
  if (state.day) {
    filteredDay = state.days
      .filter(day => day.name === dayName) || [];
  }
  let filteredInts = [];
  if (filteredDay[0] && state.day) {
    filteredInts = filteredDay[0].interviewers
      .map(interId => state.interviewers[`${interId}`]);
  }
  return filteredInts;
};