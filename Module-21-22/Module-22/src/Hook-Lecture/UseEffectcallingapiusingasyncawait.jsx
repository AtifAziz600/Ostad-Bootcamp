import { useEffect, useState } from "react";

const UseEffectcallingapiusingasyncawait = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        (async() => {
            let response = await fetch("https://jsonplaceholder.typicode.com/posts");
            let result = await response.json();
            setData(result);
        })()
    }, [])
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default UseEffectcallingapiusingasyncawait;