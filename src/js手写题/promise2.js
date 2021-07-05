let fs = require('fs')

const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

const resolvePromise = function (x, resolve, reject) {
  if (x instanceof Promise) {
    x.then(
      (y) => {
        return resolvePromise(y, resolve, reject)
      },
      (reason) => {
        reject(reason)
      }
    )
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        try {
          this.status = RESOLVED
          this.value = value
          this.onFulfilledCallbacks.forEach((fn) => fn())
        } catch (err) {
          reject(err)
        }
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        try {
          this.status = REJECTED
          this.reason = reason
          this.onRejectedCallbacks.forEach((fn) => fn())
        } catch (err) {
          reject(err)
        }
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then = (onfulfilled, onrejected) => {
    // 处理回调函数不存在的情况
    onfulfilled =
      typeof onfulfilled === 'function' ? onfulfilled : (value) => value
    // 当未注册onrejected回调函数时，promise中的异常或拒绝信息直接抛出，这样catch的回调才能捕获异常
    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : (reason) => {
            throw reason
          }
    // then函数需要返回一个新的promise
    return new Promise((resolve, reject) => {
      // 异步执行回调
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onfulfilled(this.value)
              resolvePromise(x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onrejected(this.reason)
              resolvePromise(x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
      } else if (this.status === RESOLVED) {
        // 同步执行(立即执行)
        setTimeout(() => {
          try {
            const x = onfulfilled(this.value)
            resolvePromise(x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      } else {
        // 同步执行(立即执行)
        setTimeout(() => {
          try {
            const x = onrejected(this.reason)
            resolvePromise(x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }
    })
  }
}

Promise.finally = function (callback) {
  return this.then(
    (value) => Promise.resolve(callback()).then(() => value),
    (reason) =>
      Promise.resolve(callback()).then(null, () => {
        throw reason
      })
  )
}

Promise.all = function (promises) {
  const result = []
  let count = 0
  return new Promise((resolve, reject) => {
    if (!promises.length) {
      resolve(result)
    } else {
      promises.forEach((promise, index) => {
        Promise.resolve()
          .then(() => promise)
          .then(
            (value) => {
              // result.splice(index, 0, value)
              result[index] = value
              count += 1
              if (result.length === promises.length) {
                resolve(result)
              }
            },
            (reason) => {
              reject(reason)
            }
          )
      })
    }
  })
}

Promise.resolve = (param) => {
  if (param instanceof Promise) return param
  return new Promise((resolve, reject) => {
    resolve(param)
  })
}

Promise.prototype.catch = function (onrejected) {
  return this.then(() => {}, onrejected)
}

// 三元版本
// Promise.all = function (promises) {
//   return new Promise((resolve, reject) => {
//     let result = []
//     let len = promises.length
//     if (len === 0) {
//       resolve(result)
//       return
//     }
//     const handleData = (data, index) => {
//       result[index] = data
//       // 最后一个 promise 执行完
//       if (index == len - 1) resolve(result)
//     }
//     for (let i = 0; i < len; i++) {
//       // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
//       Promise.resolve(promise[i])
//         .then((data) => {
//           handleData(data, i)
//         })
//         .catch((err) => {
//           reject(err)
//         })
//     }
//   })
// }

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve()
        .then(() => {
          return p
        })
        .then(
          (value) => {
            resolve(value)
          },
          (error) => {
            reject(error)
          }
        )
    })
  })
}

// 封装一个支持promise中断的方法
function getPromiseWithAbort(promise) {
  const obj = {}
  const abortPromise = new Promise((resolve, reject) => {
    obj.abort = reject
  })
  obj.promise = Promise.race([promise, abortPromise])
  return obj
}



let promise = new Promise((resolve, reject) => {
  console.log('execute')
  setTimeout(() => {
    resolve(0)
  }, 10)
})

const promiseObj = getPromiseWithAbort(promise)
promiseObj.promise.then(() => {
  console.log("resolved")
})
promiseObj.abort()





