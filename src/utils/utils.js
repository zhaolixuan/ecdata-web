export function deleteArray (list, id) {
  list.forEach((value, index) => {
    if (value.id === id) {
      list.splice(index, 1)
    }
  })
  return list
}

export function downloadFile (fileByte, name) {
  const link = document.createElement('a')
  const blob = new Blob([fileByte])
  link.style.display = 'none'
  link.target = '_blank'
  link.href = URL.createObjectURL(blob)
  link.download = name // 下载的文件名
  document.body.appendChild(link)
  link.click()
  link.remove()
}
// 获取上一个月份
export function getLastMonth () {
  var date = new Date();
  var year = date.getFullYear()   //当前年：四位数字
  var month = date.getMonth()     //当前月：0-11

  if (month == 0) {   //如果是0，则说明是1月份，上一个月就是去年的12月
    year -= 1
    month = 12
  }
  month = month < 10 ? ('0' + month) : month   //月份格式化：月份小于10则追加个0
  let lastYearMonth = `${year}${month}`
  return lastYearMonth
}

let timer = null
export function debounce (fn, interval) {
  const gapTime = interval || 500
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, gapTime)
  }
}

export const statusColor = {
  IS_SUBMIT: '#1AD4BF',
  NO_SUBMIT: '#999999',
  APPROVAL: '#F88515',
  FAILED: '#F44336',
  COMPLETE: '#1E87F0'
}
