import request from '@/utils/request'

/**
 * post 请求样例
 */
// 首页-网络零售市场概况
export const getWLLSSCGKUANG = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/WLLSSCGKUANG',
    data
  })
}

// 首页-网络零售分地区情况
export const getWLLSFDQQKUANG = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/WLLSFDQQKUANG',
    data
  })
}

// 首页-网络零售分行业情况
export const getWLLSFHYQKUANG = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/WLLSFHYQKUANG',
    data
  })
}

// 首页-网络零售月度走势情况
export const getWLLSYDZSQKUANG = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/WLLSYDZSQKUANG',
    data
  })
}
// 首页-网络零售月度走势情况
export const getZTBD = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/ZTBD',
    data
  })
}


// 首页-重点网络零售企业排行
export const getZTBDQYPH = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/ZTBD_QYPH',
    data
  })
}

// 首页-重点网络零售企业店铺排行
export const getZTBDQYDPPH = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/ZTBD_QYDPPH',
    data
  })
}

// 首页-•	重点网络零售品牌排行
export const getZTBDPPPHB = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/ZTBD_PPPHB',
    data
  })
}

// 首页-•	重点网络零售餐饮店铺排行
export const getZTBDCYDPPHB = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/ZTBD_CYDPPHB',
    data
  })
}