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

// 获取特定元素的自定义属性值
export function getData(el, name, value) {
  const prefix = 'data-'
  name = prefix + name
  if (value) {
    return el.setAttribute(name, value)
  } else {
    return el.getAttribute(name)
  }
}

const elementStyle = document.createElement('div').style
const vendor = (() => {
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (const key of Object.keys(transformNames)) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
