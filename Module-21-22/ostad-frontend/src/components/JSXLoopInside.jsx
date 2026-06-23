
const JSXLoopInside = () => {
    const fruit = ["Apple", "Banana", "Orange"]
    return (
        <div>
            <h1>Weclome fruit</h1>
            <ul>
                {fruit.map((fruit, index) => {
                {
                return <li key={index}>{fruit}</li>
            }
            })}
            </ul>
        </div>
    );
};

export default JSXLoopInside;