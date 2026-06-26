import { useState } from "react";

const UseStateWorkingWithImmutableObject = () => {
    const [myObj, setObj] = useState({
        key1: "Value 1",
        key2: "Value 2",
        key3: "Value 3",
    });

    const handleClick = () => {
        setObj(prevObj => ({
            ...prevObj,
            key2: "New Value 2",
            key3: "New Value 3"
        }))
    }

    return (
        <div>
            <p>{myObj.key1}</p>
            <p>{myObj.key2}</p>
            <p>{myObj.key3}</p>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default UseStateWorkingWithImmutableObject;