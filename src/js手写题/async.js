function getData() {
  console.log('getData')
  return '11111111'
}

function* testG() {
  try {
    const data = yield getData()
    console.log('data: ', data)
  } catch (err) {
    console.log('err', err)
  }

  const data2 = yield getData()
  console.log('data2: ', data2)
  return 'success'
}

const gen = testG()
gen.next()
gen.next(1)
const { value, done } = gen.next(2)
console.log('value', value)

function asyncToGenerator(genertatedFunc) {
  return function asyncFunc() {
    return new Promise((resolve, reject) => {
      const gen = genertatedFunc()
      const step = (funcName, param) => {
        let generatorResult
        try {
          generatorResult = gen[funcName](param)
        } catch (err) {
          reject(err)
        }
        
        const { value, done } = generatorResult
        if (done) {
          resolve(value)
        } else {
          new Promise((resolve) => resolve(value))
            .then((res) => {
              step("next", res)
            })
            .catch((err) => {
              step("throw", err)
            })
        }
      }
      step()
    })
  }
}
