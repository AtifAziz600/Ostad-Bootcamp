import { useEffect } from "react";

const UseEffectunderstandingargumentsanduses = () => {
    useEffect(() => {
        console.log("Computed Mounted")
    }, [1])
    return (
        <div>
            
        </div>
    );
};

export default UseEffectunderstandingargumentsanduses;