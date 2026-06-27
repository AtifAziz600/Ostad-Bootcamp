import { useEffect, useState } from "react";

const UseEffectcallingapiusingpromises = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(json => setData(json))
    },[])
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default UseEffectcallingapiusingpromises;