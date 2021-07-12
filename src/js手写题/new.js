// new操作符被调用后进行了以下操作
// 1.创建一个空对象obj
// 2.使该对象可以访问到构造函数的实例原型
// 3.借助apply调用构造函数让该对象可以访问到私有属性
// 4.如果构造函数返回值是对象则直接返回对象作为实例，如果返回值不是对象，则返回obj作为实例

function newFactory(ctor, ...args) {
  if (typeof ctor !== 'function' || !ctor.prototype) {
    throw new Error('the first param is not a constructor')
  }

  const obj = Object.create()
  obj.__proto__ = ctor.prototype
  const result = ctor.apply(obj, ...args)

  const isFunction = typeof result === 'function'
  const isObject = typeof result === 'object' && result !== null

  return isObject || isFunction ? result : obj
}



