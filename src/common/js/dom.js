// 用于给dom元素添加class
export function addClass(el, className) {
  // 先进行判断是否有该className
  if (hasClass(el, className)) {
    return // 如果有，我们什么都不做
  }
  // 如果没有该className
  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 判断dom是否有class
export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
