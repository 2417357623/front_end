import React from 'react'
import './assets/global.css'
import  Hello from './component/Hello.tsx'

var a  = 1;
function App () {
  const test = () => {
    for (let i = 0; i < 100; i--) {
      return 2
    }
  }
  return (
    <>
      <div className={'test'}>{'hello' + test() + "var"}</div>
      <Hello name="TypeScript" enthusiasmLevel={10} />
    </>
  )
}

export default App
