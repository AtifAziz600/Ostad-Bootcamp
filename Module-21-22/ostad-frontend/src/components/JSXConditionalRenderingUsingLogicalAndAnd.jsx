
const JSXConditionalRenderingUsingLogicalAndAnd = () => {
    const user = {isAdmin: true};
    return (
        <div>
            {user.isAdmin && <h1>The Admin is logged it</h1>}
        </div>
    );
};

export default JSXConditionalRenderingUsingLogicalAndAnd;