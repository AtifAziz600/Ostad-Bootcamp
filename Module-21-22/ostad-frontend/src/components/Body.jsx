

const Body = () => {
    const fruit = ["Apple", "Banana", "Orange"];
    const stringPrint = "Hello World";
    const isLogButton = false;
    return (
        <div>
            <h1>{stringPrint}</h1>
            <p style={{color: "red"}}>Color</p>
            {
                fruit.map((items, index) => {
                    return <li key={index}>{items}</li>
                })
            }
            <p style={{background: "blue", fontSize: "20px"}}>Hello</p>
            <button onClick={() => alert("Ok")}>Click me</button>
            {
                isLogButton? <button>Logout</button> : <button>Login</button> 
            }
        </div>
    );
};

export default Body;