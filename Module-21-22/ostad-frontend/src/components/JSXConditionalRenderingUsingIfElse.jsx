
// const JSXConditionalRenderingUsingIfElse = () => {
//     const state = false
//     if(state){
//             return (
//         <div>
//             <button>Logout</button>
//         </div>
//     );
//     } else {
//           return (
//         <div>
//             <button>Login</button>
//         </div>
//     );
//     }
// };

// export default JSXConditionalRenderingUsingIfElse;


const JSXConditionalRenderingUsingIfElse = () => {
    const LoginStatus = (status) => {
        if(status){
            return <button>Logout</button>
        } else {
            return <button>Login</button>
        }
    }
    return (
        <div>
            {LoginStatus(false)}
        </div>
    );
};

export default JSXConditionalRenderingUsingIfElse;