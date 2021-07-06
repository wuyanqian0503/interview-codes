import { RouterContext } from "./Router.js"
import React from 'react'

export function useHistory() {
  const { history } = React.useContext(RouterContext);
  return history
}

export function useLocation() {
  const { location } = React.useContext(RouterContext);
  return location
}