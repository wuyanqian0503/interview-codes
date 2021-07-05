let promise = new Promise((resolve, reject) => {
  console.log('execute')
  console.log("0")
  resolve(0)
  // reject(0)
  // throw new Error("报错了")
})

let promise1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("1")
    resolve("111")

  }, 1000)
})

promise1.then(() => {
  console.log("111")
})

let promise2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("2")

  }, 1000)
  resolve(promise1)
})

Promise.race([promise, promise1, promise2]).then((res) => {
  console.log('res', res)
}, () => {
  console.log('onrejected')
})

// Promise.resolve().then((value) => {
//   console.log("resolve0" , value)
// })

// const promise1 = promise.then((res) => { // onfulfilled
//   console.log(res)
//   return new Promise((resolve1) => { // x promise
//     resolve1(new Promise((resolve2) => {  // y promise
//       resolve2("resolve2") // z 普通值
//     }))
//   })
// }).then((val) => {
//   console.log("res", val)
// })

// console.log("promise1", promise1)

// const promise2 = new Promise((resolve, reject) => {
//   resolve(0)
// })
// const promise3 = promise2.then((a) => {
//   console.log("a", a)
//   // throw new Error("11111")
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(1)
//     }, 3000)
//   })
// }).then((value) => {
//   console.log("promise3 resolve 后走到这里, resolvedValue:", value)
// }, (error) => {
//   console.log("promise3 reject 后走到这里, error: ", error)
// })

// promise解决了什么问题 1.链式调用解决嵌套回调的问题 和 2.同步并发问题

// 1.存在pendding、 failed、succeed
// 2.实例可以调用then方法，pendding时需要将then方法存起来
// 3.then方法还可以继续调用then
