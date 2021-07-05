import { parsePath, readOnly } from './utils.js'

const { search, pathname, hash, state = null } = window.location

let location = readOnly({ search, pathname, hash })

const listeners = []

function getNextLocation(to, state) {
  return {
    state,
    ...parsePath(to),
  }
}

const push = function (to, state) {
  location = readOnly(getNextLocation(to, state))
  window.history.pushState(state, '', to)

  listeners.forEach((fn) => fn(location))
}

const listen = function (fn) {
  listeners.push(fn)

  return () => {
    const listenerIndex = listeners.indexOf(fn)
    listeners.splice((listenerIndex, 1))
  }
}

export const history = {
  push,
  listen,
}

const path =
  'https://github.com/sl1673495/react-mini-router/blob/bedd234fff9cfe566faf392968ac32f7d7894945/src/utils.ts#L8'

history.listen((location) => {
  console.log('location: ', location)
})

window.history1 = history
