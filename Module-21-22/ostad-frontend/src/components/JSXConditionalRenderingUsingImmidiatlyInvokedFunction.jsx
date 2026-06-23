
const JSXConditionalRenderingUsingImmidiatlyInvokedFunction = () => {
    const user = true;
    return (
        <div>
            {
                (() => {
                    if(user == true){
                        return <p>The user is Admin</p>
                    } else {
                        return <p>The user is guest</p>
                    }
                })()
            }
        </div>
    );
};

export default JSXConditionalRenderingUsingImmidiatlyInvokedFunction;