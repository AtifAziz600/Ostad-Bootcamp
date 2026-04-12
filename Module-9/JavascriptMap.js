const number = [1, 2, 3, 4, 5];

// const double = number.map((num, index) => {
//     return num * 2;
// })

const double = number.map(function (num, index) {
    return num * 2;
})

console.log(number)
console.log(double);