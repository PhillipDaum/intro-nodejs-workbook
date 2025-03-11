//REQUEST: recieved request in a POST request, bill, tipPercentage, numGuests

// User-generated
let bill = Number(process.argv[2]);
let tipPercentage = Number(process.argv[3]) / 100;
let numGuests = Number(process.argv[4]);

// Business Logic
let tipApount = bill * tipPercentage;
let total = bill + tipApount;
let amountOwedPerGuest = total / numGuests;

console.log(`Each guest owes: $${amountOwedPerGuest}`)

// STORE: Send the amountPerGuest, bill, tip, numOfGuest to database
// Run a query to INSERT the data into our table

// RESPONSE: Send amountOwedPerGuest to Frontend