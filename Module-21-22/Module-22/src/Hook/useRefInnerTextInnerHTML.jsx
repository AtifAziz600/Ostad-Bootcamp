import { useRef } from "react";

const useRefInnerTextInnerHTML = () => {
  let data = useRef();

  const handleClick = () => {
    data.innerHTML =
      "<h1>Hello World</h1><ul><li>Item 1</li><li>Item 2</li></ul>";
  };
    return (
<div>
      <p ref={(hi)=>data = hi}></p>
      <button onClick={handleClick}>Clcik</button>
    </div>
    );
};

export default useRefInnerTextInnerHTML;