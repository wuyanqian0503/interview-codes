import React from 'react'
import { Router, Route, useLocation, useHistory } from './react-router/index.js'
import ReactDOM from "react-dom"

function PageCompoennt({ children}: any) {

  const history = useHistory()

  const  handleClick = (pathname: string) => {
    history.push(pathname)
  }

  return <div>
    <div>
      <span onClick={() => handleClick('/a')}>页面A</span>
      <span onClick={() => handleClick('/b')}>页面B</span>
      <span onClick={() => handleClick('/c')}>页面C</span>
    </div>
    {children}
  </div>
}

export function App() {
  return (
    <Router>
      <Route pathname="/a">
        <PageCompoennt>这是页面A</PageCompoennt>
      </Route>
      <Route pathname="/b">
        <PageCompoennt>这是页面B</PageCompoennt>
      </Route>
      <Route pathname="/c">
        <PageCompoennt>这是页面C</PageCompoennt>
      </Route>
      <Route pathname="/">
        <PageCompoennt>这是页面A</PageCompoennt>
      </Route>
    </Router>
  )
}

// Add this in node_modules/react-dom/index.js
// prettier-ignore
let React1 = require('react');

// Add this in your component file
require('react-dom');
let React2 = require('react');
console.log(React1 === React2);

ReactDOM.render(App(), document.getElementById("root"))
