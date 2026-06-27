

const ShortHandIfElse = () => {
    let isLoggedIn = true;
    return (
        <div>
            {
                isLoggedIn ? <h1>Welcome Home</h1> : <button>Login</button>
            }
        </div>
    );
};

export default ShortHandIfElse;