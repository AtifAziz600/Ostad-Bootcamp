import UseRefCachingExpensiveComputation from "./Hook/UseRefCachingExpensiveComputation"
import UseRefInnerTextInnerHTML from "./Hook/useRefInnerTextInnerHTML"
import UseRefWorkingWithAttribute from "./Hook/UseRefWorkingWithAttribute"
import UseRefWorkingWithCSSClass from "./Hook/UseRefWorkingWithCSSClass"
import UseRefWorkingWithInputElement from "./Hook/UseRefWorkingWithInputElement"
import UseRefWorkingWithPersistedMutableProperty from "./Hook/UseRefWorkingWithPersistedMutableProperty"
import UseStateManagingFormLikePro from "./Hook/UseStateManagingFormLikePro"
import UseStateUnderstadingInside from "./Hook/UseStateUnderstadingInside"
import UseStateWorkingWithImmutableArray from "./Hook/UseStateWorkingWithImmutableArray"
import UseStateWorkingWithImmutableObject from "./Hook/UseStateWorkingWithImmutableObject"

function App() {

  return (
    <div>
      <UseRefInnerTextInnerHTML />
      <UseRefWorkingWithAttribute/>
      <UseRefWorkingWithInputElement/>
      <UseRefWorkingWithCSSClass/>
      <UseRefWorkingWithPersistedMutableProperty/>
      <UseRefCachingExpensiveComputation/>
      <UseStateUnderstadingInside/>
      <UseStateWorkingWithImmutableObject/>
      <UseStateWorkingWithImmutableArray/>
      <UseStateManagingFormLikePro/>
    </div>
  )
}

export default App
