// Your code will go here!
let dogName = process.argv[2];
let normalYears = Number(process.argv[3]);
console.log("dog name", dogName);
console.log("normal years", normalYears)

const toDogYears = (num) => {
    let sum = 0;
    if (num === 1) return 15;
    if (num === 2) return 24;
    sum = 24;
    for(let i = 3; i <=num; i++){
        sum+=5
    }
    return sum
}

console.log(`Your dog, ${dogName}, is ${normalYears} years old, \n but that's ${toDogYears(normalYears)} in dog years! `)