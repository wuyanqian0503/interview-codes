import { RouterContext } from './Router.js'
import React from "react"

export function Route ({pathname = '/', children}) {
  const contextValue = React.useContext(RouterContext);

  console.log("contextValue", contextValue)

  if(pathname === contextValue.location.pathname) {
    return children
  }
  return null
}