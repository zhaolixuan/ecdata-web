import request from '@/utils/request'

/**
 * get 请求样例
 */
// 当期网络零售额变化趋势
export const getCurrentData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/DQWLLSEBHQS',
    data
  })
}
export const getCurrentTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/DQWLLSEBHQS_2',
    data
  })
}
// 当期网络零售量变化趋势
export const getAreaData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/JJQYLSSCFXTU',
    data
  })
}
export const getAreaTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/JJQYLSSCFXTU',
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
