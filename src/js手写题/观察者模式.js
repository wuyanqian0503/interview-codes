
class Subject {
  constructor(name) {
    this.name = name
  }

  cbs = []

  update(status) {
    cbs.forEach(cb => cb(status));
  }

  on(cb) {
    this.cbs.push(cb)
  }
} 

class Observer {
  constructor(name) {
    this.name = name
  }
  attach(subject) {
    subject.on((status) => {
      console.log(status)
    })
  }
}

const o1 = new Observer("爸爸")
const o2 = new Observer("妈妈")
const s = new Observer("小宝宝")

o1.attach(s)
o2.attach(s)
s.update("不开心了")
