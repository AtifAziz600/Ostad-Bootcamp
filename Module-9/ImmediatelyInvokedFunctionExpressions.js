(function () {
    console.log("Hello IIFE")
})();


//More Example with api

(async function () {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
} )();

// Arrow IIFE function
(async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
})()

// Axios way

// (async () => {
//     try {
//         const repso = await axios.get("https://jsonplaceholder.typicode.com/todos");
//         console.log(repso.data);
//     } catch (error) {
//         console.log(error)
//     }
// }) ()

// Api with 
(async () => {
    const API_URL = "https://jsonplaceholder.typicode.com/todos";

    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error("API request failed");
        }

        const todos = await res.json();

        todos.forEach(todo => {
            console.log(todo.title);
        });

    } catch (error) {
        console.error("Error:", error.message);
    }
})();