
const form = () => {
    const submitData = (event) => {
        event.preventDefault()
    }
    return (
        <div>
            <form onSublit={submitData}>
                <input type="text" placeholder="Enter text" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default form;