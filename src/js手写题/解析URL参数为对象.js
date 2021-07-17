function parseParams (url) {
  const params = {}
  const paramsStr = url.split("?")[1]

  if (paramsStr) {
    const paramsStrArr = paramsStr.split("&")
    paramsStrArr.forEach((str) => {
      const keyValueArr = str.split("=")
      const [key, value] = keyValueArr
      // 值不为空
      if(value) {
        value = decodeURIComponent(value)
        // 如果对象中已经存在该key，说明对应的值是一个数组
        // 若已经有key则将值合并为数组, 否则直接插入对象中
        params[key] = params[key] ? [].concat(params[key], value) : value
      } else {
        // 值为空直接将对应的值设置为true
        params[key] = true
      }
    })
  }

  return params
}