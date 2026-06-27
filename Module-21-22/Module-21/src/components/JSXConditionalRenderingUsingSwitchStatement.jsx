
const JSXConditionalRenderingUsingSwitchStatement = () => {
    const isLoggIn = false;
    switch (isLoggIn) {
        case true:
            return <button>Logout</button>
        case false:
            return <button>Login</button>
        default:
        return null
    }
};

export default JSXConditionalRenderingUsingSwitchStatement;