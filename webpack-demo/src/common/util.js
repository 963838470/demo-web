import { Message } from 'element-ui'

/**
 * 弹出普通消息
 * @param {String} msg 消息内容
 */
 export function info(msg) {
  Message({
    type: 'info',
    message: msg,
    duration: 2000
  })
}
/**
 * 弹出警告消息
 * @param {String} msg 消息内容
 */
export function warn(msg) {
  Message({
    type: 'warning',
    message: msg,
    duration: 2000
  })
}

/**
 * 弹出成功消息
 * @param {String} msg 消息内容
 */
export function success(msg) {
  Message({
    type: 'success',
    message: msg,
    duration: 2000
  })
}

export function getQueryVariable(variable) {
  let after = window.location.hash.split('?')[1]
  if (after) {
    let reg = new RegExp('(^|&)' + variable + '=([^&]*)(&|$)')
    let r = after.match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    } else {
      return false
    }
  }
}

/**
 * 点击触发文件下载
 * @param {String} name 下载文件名称
 * @param {String} content 下载内容
 */
 export function download(name, content) {
  const fileBlob = new Blob([content], {
    type: 'application/octet-stream'
  })
  const downloadLink = document.createElement('a')
  downloadLink.download = name
  downloadLink.href = URL.createObjectURL(fileBlob)
  downloadLink.onclick = function(event) {
    document.body.removeChild(event.target)
  }
  downloadLink.style.visibility = 'hidden'
  document.body.appendChild(downloadLink)
  downloadLink.click()
}