import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

class Ap extends React.Component {
  render () {
    return (
            <>
                <div className="App">
                    <h1> Hello, World! </h1>
                </div>
                <App></App>
            </>

    )
  }
}
// eslint-disable-next-line react/no-deprecated
ReactDOM.render(<Ap />, document.getElementById('root'))