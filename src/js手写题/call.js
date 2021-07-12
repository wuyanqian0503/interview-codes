Function.prototype.myCall  = function(context, ...args) {
  if(!(this instanceof Function)) {
    console.log("the target is not a funtion")
  }

  context.func = this
  const result = context.func(...args)

  delete context.fn
  return result
}

Function.prototype.myApply = function(context, args) {

  if(typeof this !== 'function') {
    throw new TypeError("Error")
  }

  context.func = this
  const result = context.func(...args)

  delete context.func

  return result
}

Function.prototype.myBind = function(context, ...args) {
  const func = this
  // 返回一个新的函数
  return function Fn() {
  // 另外还要处理当函数被new调用的场景所以使用了isntanceof来判断
    return func.apply(this instanceof Fn ? this : context, args)
  }

  Fn.prototype = Object.create(func.prototype)
  Fn.prototype.constructor = func
  Fn.__proto__ = func
}