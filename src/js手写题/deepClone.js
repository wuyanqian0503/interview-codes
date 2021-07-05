// 借助Object.prototype.toString方法将目标值转为用字符串表示的类型，形如：[object String]
const getType = (obj) => Object.prototype.toString.call(obj)

// 判断目标值是否为对象（对象或String对象、Number对象等）
const isObject = (target) =>
  (typeof target === 'object' || typeof target === 'function') &&
  target !== null

// 可以被遍历的对象类型，5种
const canTraverse = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
  '[object Arguments]': true,
}

// 不可被遍历的对象类型，10种
const mapTag = '[object Map]'
const setTag = '[object Set]'
const boolTag = '[object Boolean]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

// 拷贝正则表达式
const handleRegExp = (target) => {
  const { source, flags } = target
  return new target.constructor(source, flags)
}

// 拷贝函数
// 事实上函数并没有可靠的拷贝方法，
// 常见的拷贝函数的方法都是借助toString实现的，
// 但因为ECMAScript对toString方法并没有任何约束，浏览器开发厂商就无所顾忌了，所以也就导致得到的字符串不一定靠谱
// 那么通过eval执行字符串，或者通过正则匹配函数体和参数这两种方式来拷贝函数结果也就都有可能不准确了
const handleFunc = (func) => {
  // 箭头函数直接返回自身，箭头函数没有prototype
  if (!func.prototype) return func
  var returnFunc
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString)
  const body = bodyReg.exec(funcString)
  if (!body) return null
  // 返回一个新函数
  if (param) {
    const paramArr = param[0].split(',')
    returnFunc =  new Function(...paramArr, body[0])
  } else {
    returnFunc = Function(body[0])
  }
  // 拷贝函数的原型和静态属性
  returnFunc.prototype = Object.create(func.prototype)
  returnFunc.prototype.constructor = returnFunc
  returnFunc.__proto__ = func
  return returnFunc
}

// 复制不可被遍历的对象
const handleNotTraverse = (target, tag) => {
  // 构造函数
  const Ctor = target.constructor
  switch (tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target))
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target))
    case stringTag:
      return new Object(String.prototype.valueOf.call(target))
    case symbolTag:
      return new Object(Symbol.prototype.valueOf.call(target))
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexpTag:
      return handleRegExp(target)
    case funcTag:
      return handleFunc(target)
    default:
      return new Ctor(target)
  }
}

const deepClone1 = (originTarget) => {
  // 过滤掉非对象的原始值，直接返回值本身
  if (!isObject(originTarget)) {
    return originTarget
  }

  // 定义一个空对象作为初始状态的返回值，接下来将遍历originTarget并复制给returnTarget
  const container = {}

  // 循环遍历的初始节点
  const initialNode = {
    parent: container,
    key: 'cloneTarget',
    value: originTarget,
  }

  // 定义一个用于循环遍历的列表，后续需要遍历的对象都会以initialNode同样的格式推入这个列表
  const loopList = [initialNode]

  // 定义一个Map用于存放已经复制过的值
  const uniqueMap = new Map()

  while (loopList.length) {
    const node = loopList.pop()
    if (!isObject(node.value)) {
      // ------ 如果不是对象， 直接赋值 ------
      node.parent[node.key] = node.value
    } else {
      // ------ 如果是对象 ------
      // 判断是不是已经复制过该值，如果已经复制过，需要保持引用
      const storedRefer = uniqueMap.get(node.value)
      if (storedRefer) {
        // 已经存在引用, 直接赋值
        node.parent[node.key] = storedRefer
        continue
      }

      if (type === setTag) {
        node.value.forEach(() => {

        })
      }

      node.parent[node.key] = {}
      // 不存在引用，将引用地址存储
      uniqueMap.set(node.value, node.parent[node.key])

      // --------  判断是否可以遍历键值 --------
      const type = getType(node.value) // 对象类型
      if (!canTraverse[type]) {
        // 不可遍历，则特殊处理
        node.parent[node.key] = handleNotTraverse(node)
      } else {
        // 可以遍历，则遍历对象的key
        for (let propName in node.value) {
          if (node.value.hasOwnProperty(propName)) {
            // 提取出子节点继续遍历（或赋值）
            loopList.push({
              parent: node.parent[node.key],
              value: node.value[propName],
              key: propName,
            })
          }
        }
      }
    }
  }

  return container.cloneTarget
}

const deepClone = (target, map = new WeakMap()) => {
  if (!isObject(target)) return target
  let type = getType(target)
  let cloneTarget
  if (!canTraverse[type]) {
    // 处理不能遍历的对象
    return handleNotTraverse(target, type)
  } else {
    // 这波操作相当关键，可以保证对象的原型不丢失！
    let ctor = target.constructor
    cloneTarget = new ctor()
  }

  if (map.get(target)) return target
  map.set(target, true)

  if (type === mapTag) {
    //处理Map
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key, map), deepClone(item, map))
    })
  }

  if (type === setTag) {
    //处理Set
    target.forEach((item) => {
      cloneTarget.add(deepClone(item, map))
    })
  }

  // 处理数组和对象
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map)
    }
  }
  return cloneTarget
}

// -------

// const a = {
//   b: {
//     c: function (d) {
//       console.log(d)
//       return d + 1
//     },
//   },
// }

// const a1 = deepClone1(a)
// console.log(a1.b.c === a.b.c)

// // ---------

// const d = {
//   b: {
//     c: new Map(),
//   },
// }

// const d1 = deepClone1(d)
// console.log(d1.b.c === d.b.c)

// // ---------

// const b = null
// console.log(deepClone1(b))

// // ---------

// const c = undefined
// console.log(deepClone1(c))

// ---------

const e = {}
e.a = e

const e1 = deepClone1(e)
console.log(deepClone1(e1))

const g = { a: 1 }

const f = {
  a: new Map(),
}

f.a.set(g, 'value')

// -------------

const h = new Set()
h.add(f)

const h1 = deepClone1(h)
console.log(deepClone1(h1))


export default deepClone