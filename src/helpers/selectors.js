export const getAppointmentsForDay = (state, dayName) => {
  const filteredDay = state.days
    .filter(day => day.name === dayName) || [];
  let filteredApps = [];
  if (filteredDay[0]) {
    filteredApps = filteredDay[0].appointments
      .map(appointmentId => state.appointments[`${appointmentId}`]);
  }
  return filteredApps;
};
