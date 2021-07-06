function debounce(fn, timeout, immediate) {
  let timerId
  return () => {
    let context = this, args = arguments

    // 是否立即执行
    const callNow = immediate && !timerId
    if(callNow) fn.apply(context, args)

    // 重新计时
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      // 当定时器到时执行时清除ID，表示当前时器已经执行过
      timerId = null
      // 修改this指向并执行
      fn.apply(context, args)
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
