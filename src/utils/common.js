import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const extractISODate = (isoDate) => dayjs(isoDate).format('YYYY-MM-DD');

const humanizeDate = (isoDate) => dayjs(isoDate).format('MMM DD') || '';

const humanizeTime = (isoDate) => dayjs(isoDate).format('HH:mm') || '';

const getDuration = (dateFrom, dateTo) => {
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);
  const diff = dayjs.duration(to.diff(from));
  const diffArray = [[diff.days(), 'D'], [diff.hours(), 'H'], [diff.minutes(), 'M']]
    .map((item) => (item[0] < 10 ? `0${item[0]}` : item[0]) + item[1])
    .filter((item, index, array) => item !== '00D' && (item !== '00H' && array[0] === '00D'));
  return diffArray.join(' ');
};

const getCalendarDateTime = (isoDate) => dayjs(isoDate).format('DD/MM/YY HH:mm');

export { extractISODate, humanizeDate, humanizeTime, getDuration, getCalendarDateTime };
