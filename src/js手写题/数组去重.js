// [0, 0, 0, 0]

function removeDuplicates(arr) {
  // 记录原数组中存在过的值
  let records = []
  // 结果数组
  let resArr = []

  arr.forEach((num) => {
    if(records.indexOf(num) === -1) {
      resArr.push(num)
      records.push(num)
    }
  })

  return resArr
}

let arr = [0, 0, 0, 0]

let res = removeDuplicates(arr)

console.log(res)  


let arrSet = new Set(arr) 
console.log(Array.from(arrSet))


