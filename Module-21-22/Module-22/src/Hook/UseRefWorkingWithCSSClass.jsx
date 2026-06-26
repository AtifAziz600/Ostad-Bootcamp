import { useRef } from "react";

const UseRefWorkingWithCSSClass = () => {
    let myText = useRef();
    const handleClick = () => {
        myText.current.classList.remove("text-success");
        myText.current.classList.add("text-danger")
    }
    return (
        <div>
            <h1 ref={myText} className="text-success">Hello World</h1>
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default UseRefWorkingWithCSSClass;