import React, {useState} from 'React'
import { history } from './history.js'

export const RouterContext = React.createContext(null);

export function Router({children}) {

  const [location, setLocation] = useState(history.location)

  useEffect(() => {
    const unListen = history.listen((location) => {
      setLocation(location)
    })
    return unListen
  }, [])

  return <RouterContext.Provider value={
    location,
    history
  }>
    {children}
  </RouterContext.Provider>
}