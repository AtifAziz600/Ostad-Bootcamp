import { useRef } from "react";

const UseRefWorkingWithPersistedMutableProperty = () => {

    let mutableVariable = useRef(0);
    const increment = () => {
        mutableVariable.current += 1;
        console.log(mutableVariable.current)
    }
    return (
        <div>
            <button onClick={increment}>Clickc</button>
            <p>Count: {mutableVariable.current}</p>
        </div>
    );
};

export default UseRefWorkingWithPersistedMutableProperty;