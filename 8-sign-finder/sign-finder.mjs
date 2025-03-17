// Create Node.js app that determines the astrological and zodiac signs for the user based on their birthday. Refer to the README instructions.
// to run: node sign-finder.mjs 1 1 1950

import { getSign, getZodiac } from 'horoscope';

const day = Number(process.argv[3]);
const month = Number(process.argv[2]);
const year = Number(process.argv[4]);

const sign = getSign({ month: month, day: day });
const zodiac = getZodiac(year);

console.log(`Your astrological sign is ${sign} and your zodiac sign is ${zodiac}`);