// 封装jsonp
import originJSONP from 'jsonp'

export default function jsonp(url, params, option) {
  url += (url.includes('?') ? '&' : '?') + joinParams(params)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function joinParams(params) {
  let url = ''
  for (const key of Object.keys(params)) {
    const value = params[key] || ''
    url += `&${key}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
