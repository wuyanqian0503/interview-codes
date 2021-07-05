function curry(fn, ...args) {
  let params = [...args]
  const curryFn = function (...args2) {
    if(args2.length > 0) {
      params = args2.concat(params)
      return curryFn
    } else {
      const res = fn(...params)
      console.log("params", params)
      console.log("res", res)
      return res
    }
  }
  return curryFn
}

const add = function(...args) {
  return args.reduce((total, val) => total + val, 0)
 }
const curryAdd = curry(add, 8, 10)

curryAdd(1)(3)()