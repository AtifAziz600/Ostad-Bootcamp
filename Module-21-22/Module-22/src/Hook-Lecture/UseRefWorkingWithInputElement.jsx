// import { useRef } from "react";


// const UseRefWorkingWithInputElement = () => {
//     let fName = useRef();
//     let lName = useRef();

//     const handleClick = () => {
//         let firstName = fName.current.value;
//         let lastName = lName.current.value;

//         alert(firstName + " " + lastName)
//     }

//     return (
//         <div>
//             <input ref={fName} type="text" /> <br />
//             <input ref={lName} type="text" /> <br />
//             <button onClick={handleClick}>Click</button>
//         </div>
//     );
// };

// export default UseRefWorkingWithInputElement;

import { useRef } from 'react';

const UseRefWorkingWithInputElement = () => {
    let fName, lName = useRef();

    const handleClick = () => {
        let firstName = fName.value;
        let lastName = lName.value;

        alert(firstName + " " + lastName);
    }
    return (
        <div>
            <input ref={(a) => fName = a} type="text" /> <br />
            <input ref={(b) => lName = b} type="text" /> <br />
            <button onClick={handleClick}>Click</button>
        </div>
    );
};

export default UseRefWorkingWithInputElement;