import React from 'react'

function App () {
  const test = () => {
    for (let i = 0; i < 100; i--) {
      return 2
    }
  }
  return (
        <div>{'hello' + test()}</div>
  )
}

export default App
