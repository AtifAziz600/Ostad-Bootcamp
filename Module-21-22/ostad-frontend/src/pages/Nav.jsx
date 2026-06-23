
const Nav = (props) => {
    return (
        <div>
            // CHild Component
            <h2>{props.Item["capital"]}</h2>
            <h2>{props.Item["population"]}</h2>
        </div>
    );
};

export default Nav;