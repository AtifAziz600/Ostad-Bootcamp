import { useState } from "react";

const UseStateUnderstadingInside = () => {
    const [number, setNumber] = useState(0);
    const increment = () => {
        setNumber(number + 1)
    }
    return (
        <div>
            <p>{number}</p>
            <button onClick={increment}>Click</button>
        </div>
    );
};

export default UseStateUnderstadingInside;