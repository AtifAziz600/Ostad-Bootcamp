const myPromise = new Promise((resolve, reject) => {

  let completed = true;

  if (completed) {
    resolve("Success, you did work");
  } else {
    reject("Error!");
  }

});

myPromise.then((result) => {
  console.log("The result is ", result);
}).catch((error) => {
    console.log("The Error is ", error)
})