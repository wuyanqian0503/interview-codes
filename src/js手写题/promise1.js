const PENDING = 'PENGDING'
const RESOLVED = 'RESOLVE'
const REJECTED = 'REJECTED'

// 判断x是不是promise，如果是的话则获取promise的状态
// 如果x是普通值的话，则直接resolve(x)
const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError(""))
  }
  if (x instanceof Promise) {
    x.then((val) => resolve(val), (reason) => reject(reason))
  } else {
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    // 初始化状态
    this.status = PENDING
    // 初始化成功时的返回值
    this.value = undefined
    // 初始化错误时的原因
    this.reason = undefined

    this.onResolvedCallbacks = [] // 成功的回调的数组
    this.onRejectedCallbacks = [] // 失败的回调的数组

    let resolve = (value) => {
      // 确保状态只能改变一次
      if (this.status === PENDING) {
        this.value = value
        this.status = RESOLVED
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }

    let reject = (reason) => {
      this.reason = reason
      this.status = REJECTED
      this.onResolvedCallbacks.forEach((fn) => fn())
    }
    // ???? 为什么要捕获后执行reject
    try {
      // 立即执行执行器
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onfulfilled, onrejected) {
    let promise2 = new Promise((resolve, reject) => {
      // 同步
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            const x = onfulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch(err){
            reject(err)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        try {
          const x = onrejected(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch(err){
          reject(err)
        }

      }
      // 异步
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          try {
            const x = onfulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch(err){
            reject(err)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            const x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch(err){
            reject(err)
          }
        })
      }
    })
    return promise2
  }
}
