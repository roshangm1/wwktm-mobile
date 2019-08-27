import moment from 'moment';

export function getDaySchedule(scheduleData, day) {
  return scheduleData.filter(data => {
    const endTime = data.endTime.seconds * 1000;
    const dateInMs = new Date(day).getTime();

    return moment(endTime).isSame(dateInMs, 'day');
  });
}
