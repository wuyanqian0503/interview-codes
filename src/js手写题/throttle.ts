function throttle(fn, timeout) {
  let canRun = true
  return () => {
    if(canRun) {
      canRun = false
      setTimeout(() => {
        canRun = true
      }, timeout)
      fn()
    }
  }
}

const fn = throttle(() => {
  console.log("-------节流成功-------")
}, 3000)

let i = 0
let interval = setInterval(() => {
  ++i
  if(i>7) {
    return clearInterval(interval)
  }
  console.log("手动触发")
  fn()
}, 1000)