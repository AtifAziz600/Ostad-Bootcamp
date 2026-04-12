var i = 10;
var abc;

function sqr(num) {
    function printI() {
        console.log(abc);
        console.log("Inside PrintI: ", i);
        // setTimeout(() => {
        //     console.log("Inside timeout ----: ");
        // }, 5000)

    const intervalId = setInterval(() => {
            console.log("Inside setInterval: ", 1000)
                console.log(intervalId);
        })
    }

    printI();

    return num * num;
}

var a = sqr(i);
console.log("End: ", a);
