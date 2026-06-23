
const JSXImmediatelyinvokedfunction = () => {
    const role = ""
    return (
        <div>
            {
                (() => {
                    if(role === "admin"){
                        return <h1>Welcome Admin</h1>
                    }else if(role === "user"){
                        return <h1>Welcome User</h1>
                    } else if(role === "guest"){
                        return <h1>Welcome Guest</h1>
                    } else if(role === "Vendor"){
                        return <h1>Welcome Vendor</h1>
                    } else {
                        return <h1>Please login</h1>
                    }
                })()
            }
        </div>
    );
};

export default JSXImmediatelyinvokedfunction;