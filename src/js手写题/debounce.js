function debounce(fn, timeout) {
  let timerId
  return () => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn()
    }, timeout)
  }
}

const fn = debounce(() => {
  console.log('防抖成功')
}, 3000)

let i = 0
let interval = setInterval(() => {
  ++i
  if (i > 3) {
    return clearInterval(interval)
  }
  console.log('手动触发')
  fn()
}, 1000)

function A() {
  debugger
  const a = 1
  function B() {
    console.log(a)
  }
  return B
}
const b = A()

b()
