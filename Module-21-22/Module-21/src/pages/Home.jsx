import Nav from "./Nav"

const Home = ({ name, capital, Item }) => {
  return (
    <div>
      {/* Child component */}
      <h1>{name}</h1>
      <h1>{capital}</h1>
      <Nav Item={Item} />
    </div>
  )
}

export default Home