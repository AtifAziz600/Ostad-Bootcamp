import { useRef } from "react";

const UseRefCachingExpensiveComputation = () => {

    let ExpensiveData = useRef(null);

    let myTag = useRef();

    const handleApi = async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        ExpensiveData.current = await res.json();
    }
    
    const viewData = () => {
        myTag.current.innerText = JSON.stringify(ExpensiveData.current);
    }
    return (
        <div>
            <p ref={myTag}></p>
            <button onClick={handleApi}>Click</button>
            <button onClick={viewData}>Click</button>
        </div>
    );
};

export default UseRefCachingExpensiveComputation;