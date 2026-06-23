import Body from "./components/Body"
import ContactUs from "./components/ContactUs"
import Footer from "./components/Footer"
import Header from "./components/Header"
import JSXImmediatelyinvokedfunction from "./components/JSXImmediatelyinvokedfunction"
import JSXLoopInside from "./components/JSXLoopInside"
import ShortHandIfElse from "./components/ShortHandIfElse"
import Slider from "./components/Slider"


function App() {

  return (
    <div>
      <Header/>
      <Slider/>
      <Body/>
      <ShortHandIfElse/>
      <JSXImmediatelyinvokedfunction/>
      <JSXLoopInside/>
      <ContactUs/>
      <Footer/>
    </div>
  )
}

export default App
