import request from '@/utils/request'

/**
 * get 请求样例
 */
// 当期网络零售额变化趋势
export const getWholeData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/BDQTLSSCFXITU',
    data
  })
}
export const getWholeTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/BDQTLSSCFXITU',
    data
  })
}
// 上级网络零售量变化趋势
export const getEqualData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/SJDQZTLSSCFXTU',
    data
  })
}
export const getEqualTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/SJDQZTLSSCFXTU',
    data
  })
}
// 行政网络零售量变化趋势
export const getAdminData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/XZQYHXDBFXTU',
    data
  })
}
export const getAdminTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/XZQYHXDBFXTU',
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
