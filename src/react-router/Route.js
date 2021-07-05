import {RouterContext} from './Router.js'
import React from "react"

export function Route ({pathname = '/', children}) {
  const { location } = React.useContext(RouterContext);
  debugger

  if(pathname === location.pathname) {
    return children
  }
  return null
}