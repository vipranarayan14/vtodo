/**
 * Extracted from 'https://github.com/rkokkelk/todo-txt-js/todotxt.js'
 */

let reFourDigits = /^\d{4}$/;
let reTwoDigits = /^\d{2}$/;

export const stringToDate = (string: string): Date | null => {
  let bits = string.split('-');
  if (bits.length !== 3) return null;
  let year = bits[0],
    month = bits[1],
    day = bits[2];

  let regexTest =
    reFourDigits.test(year) && reTwoDigits.test(month) && reTwoDigits.test(day);

  if (!regexTest) return null;

  let dtStr = bits.join('/'); // Slashes ensure local time is used, per http://blog.dygraphs.com/2012/03/javascript-and-dates-what-mess.html
  let dt = new Date(dtStr);
  if (dt.toString() === 'Invalid Date') return null;
  // Now make sure that javascript didn't interpret an invalid date as a date (e.g. 2014-02-30 can be reimagined as 2014-03-02)
  let $year = parseInt(year, 10);
  let $month = parseInt(month, 10);
  let $day = parseInt(day, 10);

  if (dt.getFullYear() !== $year) return null;
  if (dt.getMonth() !== $month - 1) return null;
  if (dt.getDate() !== $day) return null;
  // Hooray, a valid date!
  return dt;
};
