import request from '@/utils/request'

/**
 * get 请求样例
 */
// 零售额
export const getFarmSales = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/NZ_AND_NCPGK_LSE',
    data
  })
}
export const getFarmTop = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/NZ_AND_NCPGK_TOP1',
    data
  })
}
// 行业交易规模
export const getFarmData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/NZ_AND_NCPGK_HYJYGM',
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
