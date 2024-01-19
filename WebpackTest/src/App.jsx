import React from 'react'
import './assets/global.css'

var a  = 1;
function App () {
  const test = () => {
    for (let i = 0; i < 100; i--) {
      return 2
    }
  }
  return (
        <div className={'test'}>{'hello' + test() + "var"}</div>
  )
}

export default App
