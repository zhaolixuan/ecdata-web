import request from '@/utils/request'

/**
 * get 请求样例
 */
// 全国本地整体商品类型分析
export const getWholeData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGZTSPLXFXI',
    data
  })
}
export const getWholeTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QGZTSPLXFXI',
    data
  })
}
// 全国本地实物类商品大类
export const getMatterData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGSWLSPDLFXI',
    data
  })
}
export const getMatterTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QGSWLSPDLFXI',
    data
  })
}
// 全国本地非实物类商品大类分析
export const getNonmatterData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGFSWLSPDLFXI',
    data
  })
}
export const getNonmatterTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QGFSWLSPDLFXI',
    data
  })
}
/**
 * post 请求样例
 */
export const postRequest = data => {
  return request({
    method: 'POST',
    url: '',
    data
  })
}
