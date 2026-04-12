// try {
//     // if there is any error in this block, it will be caught by the catch block
// } catch (error) {
//     // this block will execute if there is an error in the try block
// }finally {
//     // this block will execute regardless of whether there is an error or not
// }


try {
    let taka = 100;
    let balance = Number(taka);
    if (isNaN(balance)) {
        throw new Error("Invalid Input");
    }
    console.log("Your Balance is:" + balance);
} catch (error) {
    console.log("Error:", error.message);
} finally {
    console.log("This work is done")
}

try {
    let taka = "Hello";
    let balance = Number(taka);
    if (isNaN(balance)) {
        throw new Error("Invalid Input");
    }
    console.log("Your Balance is:" + balance);
} catch (error) {
    console.log("Error:", error.message);
} finally {
    console.log("This work is done")
}