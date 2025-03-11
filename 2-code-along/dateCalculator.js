const messages = {
    Mon: "happy monday!",
    Tue: "don't forget your snack",
    Wed: "spidermonkey Wednesday",
    Thu: "ooooh shiney",
    Fri: "apples",
    Sat: "stay at home",
    Sun: "hi"
}

let date = new Date();
let fullString = date.toDateString();
let day = fullString.slice(0,3);
console.log(day, messages[day])

