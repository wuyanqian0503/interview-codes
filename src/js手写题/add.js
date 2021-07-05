const add = (arr) => {
  return arr.reduce((total, val) => total + val, 0)
}

function curryAdd(...args) {
  let res = add(args)
  function _add(...args2) {
    if (args2.length > 0) {
      res += add(args2)
      return _add
    } else {
      console.log('res', res)
      return res
    }
  }
  return _add
}

curryAdd(1, 2)()
curryAdd(1, 2)(3, 4)()
curryAdd(1, 2)(3, 4, 5, 6)()

function curryAdd1(...args) {
  let res = add(args)
  function _curryAdd1(...args2) {
    res += add(args2)
    return _add
  }
  _curryAdd1.toString = () => {
    console.log('res', res)
    return res
  }
  return _curryAdd1
}

curryAdd1(1, 2)
curryAdd1(1, 2)(3, 4)
a = curryAdd1(1, 2)(3, 4, 5, 6)

console.log("a: ", a)


