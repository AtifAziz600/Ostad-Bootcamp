import Body from "./components/Body"
import ContactUs from "./components/ContactUs"
import Footer from "./components/Footer"
import Header from "./components/Header"
import JSXConditionalRenderingUsingIfElse from "./components/JSXConditionalRenderingUsingIfElse"
import JSXConditionalRenderingUsingLogicalAndAnd from "./components/JSXConditionalRenderingUsingLogicalAndAnd"
import JSXConditionalRenderingUsingSwitchStatement from "./components/JSXConditionalRenderingUsingSwitchStatement"
import JSXConditionalRenderingUsingTernaryOperator from "./components/JSXConditionalRenderingUsingTernaryOperator"
import JSXImmediatelyinvokedfunction from "./components/JSXImmediatelyinvokedfunction"
import JSXLoopInside from "./components/JSXLoopInside"
import ShortHandIfElse from "./components/ShortHandIfElse"
import Slider from "./components/Slider"
import Home from "./pages/Home"
import Menu from "./pages/Menu"


function App() {
  const data ={
    "capital": "Dhaka",
    "population": "160 million"
  }
  const handleClick = () => {
    alert("Button Click")
  }
  return (
    <div>
      <Menu onClickBtn={handleClick}/>
      <Home capital="Dhaka" Item={data}/> // Parent component
      <Header/>
      <Slider/>
      <Body/>
      <ShortHandIfElse/>
      <JSXImmediatelyinvokedfunction/>
      <JSXLoopInside/>
      <JSXConditionalRenderingUsingIfElse/>
      <JSXConditionalRenderingUsingSwitchStatement/>
      <JSXConditionalRenderingUsingTernaryOperator/>
      <JSXConditionalRenderingUsingLogicalAndAnd/>
      <ContactUs/>
      <Footer/>
    </div>
  )
}

export default App
