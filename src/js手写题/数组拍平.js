function flat(originArr) {
  // todo 非数组抛出异常
  const resArr = []
  const step = function (value) {
    if (value instanceof Array) {
      value.forEach((value) => {
        step(value)
      })
    } else {
      resArr.push(value)
    }
  }
  step(originArr)
  return resArr
}




function easyFlatByReduce(originArr) {
  // todo 非数组抛出异常
  const step = (preArr, value) => {
    if(value instanceof Array) {
      return value.reduce(step, preArr)
    } else {
      return preArr.concat(value)
    }
  }
  return originArr.reduce(step, [])
}

console.log(flatByReduce([[2333,1111], 3333, [1, {"aaa": [123]}]]))


