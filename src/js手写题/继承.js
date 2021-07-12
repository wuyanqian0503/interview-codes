// 继承的方式有很多种，大致可以归纳为几种
// 1、通过原型链继承
// 2、通过call在子类中调用父类继承
// 3、以上两种的组合
// 4、es6中的类的 extends



// 1、原型链继承
// 通过将prototype指向父类的实例来实现继承实例属性
function Parent() {
  this.name = "xiaoming"
}

Parent.prototype.getName = function() {
  return this.name
}

function Child() {
  this.age = 18
}

Child.prototype.getAge = function() {
  return this.age
}

// 继承实例自身的属性和实例原型上的属性
// child.name = child.__proto__.name = Child.prototype.name = parent.name = parent.__proto__.name = Parent.prototype.name
Child.prototype = new Parent()
// 继承静态属性
Child.__proto__  = Parent

var child = new Child()
console.log("child's name", child.name)


// 2、借助call继承
// 通过在子类中借助call来调用父类，达到用父类来修改子类实例，从而让子类实例中拥有父类的属性
// 问题是，父类原型上的属性没有被挤成，

function Parent1() {
  this.name = "xiaoming"
}

function Child1() {
  Parent1.call(this)
}

// 最完整的继承方案
// 结合call、Object.create实现的
function Parent2() {
  this.name = 111
}

Parent2.prototype.getName = function() {
  return this.name
}
function Child2 () {
  // 1、继承父类实例自身的属性
  Parent2.call(this)
}

// 2、继承原型上的属性
Child2.prototype = Object.create(Parent2.prototype)
Child2.prototype.constructor = Child2

// 3、继承静态属性
Child2.__proto__ = Parent2
