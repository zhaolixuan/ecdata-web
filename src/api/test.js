import request from '@/utils/request'

/**
 * get 请求样例
 */
export const getRequest = params => {
  return request({
    method: 'GET',
    url: '',
    params
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