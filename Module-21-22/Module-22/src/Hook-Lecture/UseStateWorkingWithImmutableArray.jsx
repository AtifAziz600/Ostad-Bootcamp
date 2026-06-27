import { useState } from "react";

const UseStateWorkingWithImmutableArray = () => {
    let [list, setList] = useState([]);
    let [items, setItems] = useState("");

    const handleSubmit = () => {
        list.push(items)
        setList([...list]);
    }

    const removeItem = (index) => {
        list.splice(index, 1)
        setList([...list]);
    }
    return (
        <div>
            <p>Data {items}</p>
            <p>List: {list.length}</p>
            <input type="text" onChange={(e) => setItems(e.target.value)} />
            <button onClick={() =>handleSubmit()}>Click</button>

            <table>
                <tbody>
                    {
                        list.length !==0 ? (list.map((element, i) => {
                            return (
                                <tr key={i.toString()}><td>{element}</td><td><button onClick={()=>removeItem()}>Remove</button></td></tr>
                            )
                        })) : (<tr><td>No Item Found</td></tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};
export default UseStateWorkingWithImmutableArray;