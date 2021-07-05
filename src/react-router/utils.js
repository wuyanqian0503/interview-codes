export function parsePath (path) {

  if(!path) return {}

  // 拆解后的path
  const partialPath = {}

  // 获取hash
  const hashIndex = path.indexOf("#")
  if(hashIndex >= 0) {
    partialPath.hash = path.substr(hashIndex)
    path = path.substr(0, hashIndex)
  }

  // 获取search
  const searchIndex = path.indexOf("?")
  if(searchIndex >= 0) {
    partialPath.searchIndex = path.substr(searchIndex)
    path = path.substr(0, searchIndex)
  }

  // 获取path
  partialPath.pathname = path

  return partialPath
}


const path = "https://github.com/sl1673495/react-mini-router/blob/bedd234fff9cfe566faf392968ac32f7d7894945/src/utils.ts?name=ssh#L8"

console.log(parsePath(path))


export function readOnly(obj) {
  return Object.freeze(obj)
}
