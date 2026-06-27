
const JSXConditionalRenderingUsingTernaryOperator = () => {
    const user = { isAdmin: true }
    return (
        <div>
            {user.isAdmin ? <p>The user is Admin</p> : <p>The user is not Admin</p>}           

        </div>
    );
};

export default JSXConditionalRenderingUsingTernaryOperator;