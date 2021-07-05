import {Router, Route, useLocation, useHistory} from  "./index.js"
import React from "react"

function PageCompoennt() {
  
}



export function App() {
  return <Router>
    <Route pathname="/a">这是页面A</Route>
    <Route pathname="/b">这是页面B</Route>
    <Route pathname="/C">这是页面C</Route>
  </Router>
}


