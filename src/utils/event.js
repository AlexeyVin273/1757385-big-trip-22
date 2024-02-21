import dayjs from 'dayjs';

/**
 *
 * @param {*} event Event object
 * @returns true if the event is in the future, false otherwise
 */
const isFutureEvent = (event) => dayjs().isBefore(dayjs(event.fromDate));

/**
 *
 * @param {*} event Event object
 * @returns true if the event is in the present, false otherwise
 */
const isPresentEvent = (event) => dayjs().isBefore(dayjs(event.toDate)) && dayjs().isAfter(dayjs(event.fromDate));

/**
 *
 * @param {*} event Event object
 * @returns true if the event is in the past, false otherwise
*/
const isPastEvent = (event) => dayjs().isAfter(dayjs(event.toDate));

export { isFutureEvent, isPresentEvent, isPastEvent };
