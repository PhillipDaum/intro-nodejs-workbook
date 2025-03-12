// Create a program that checks to see if the current year is leap year using the Moment module.
const moment = require('moment'); // require
const isCurrentYearLeapYear = moment(moment().year()).isLeapYear()
if (isCurrentYearLeapYear) {
    console.log("It is a leap year.")
} else {
    console.log("It is not a leap year.")
}
