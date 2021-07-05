import { RouterContext } from "./Router.js"

export function useHistory() {
  const { history } = useContext(RouterContext);
  return history
}

export function useLocation() {
  const { location } = useContext(RouterContext);
  return location
}