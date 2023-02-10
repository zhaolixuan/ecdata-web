import request from '@/utils/request'
// 行业交易规模
export const getTradeData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/HYJIGMFX_TWO_LSE',
    data
  })
}
export const getTradeTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/HYJIGMFX_TWO_LSE_TOP30',
    data
  })
}
