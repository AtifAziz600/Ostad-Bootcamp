fetch("https://jsonplaceholder.typicode.com/posts")
.then((response) => response.json())
.then((data) => {
    console.log(data)
})
.catch((error) => {
    console.log(error)
})

async function getData(){
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts")
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

getData();