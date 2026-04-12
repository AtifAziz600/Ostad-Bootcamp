const getData= () => {
    return new Promise((resolve, reject) => {
        const success = true;

        setTimeout(() => {
            if(success){
                resolve("Data pass Successfully")
            } else {
                reject("Data fail to pass")
            }
        }, 2000)
    })
}

getData().then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})

console.log("Project is running");

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const user = await response.json();
    console.log(user);

  } catch (error) {
    console.log("Error:", error.message);
  }
};


fetchData();