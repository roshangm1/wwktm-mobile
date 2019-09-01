import moment from 'moment';

export function getTalkDateRange(startDate, endDate) {
  const timeStart = moment(startDate.seconds * 1000).format('LT');
  const timeEnd = moment(endDate.seconds * 1000).format('LT');

  return `${timeStart} - ${timeEnd}`;
}

export function getPostTime(date) {
  return moment(date).fromNow();
}
