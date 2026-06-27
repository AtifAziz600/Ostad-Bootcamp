

const Button = () => {
    return (
        <div>
            <button onClick={function handleClick() {
                alert("This is a message")
            }}>Click Me!</button>
        </div>
    );
};

export default Button;