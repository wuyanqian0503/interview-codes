const add = (...args) => {
  return args.reduce((a, b) => a + b, 0)
}

const curryAdd = (...args) => {
  let res = add(...args)
  let _add = (...args2) => {
    if (args2.length) {
      res += add(...args2)
      return _add
    }else {
      console.log('res: ', res);
      return res
    }
  }
  return _add
}

curryAdd(1,2,3)(4)()