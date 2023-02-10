import request from '@/utils/request'

/**
 * post 价格区间规模柱图
 */
export const getPriceScopeBar = (url, data) => {
  return request({
    method: 'POST',
    url: `/common/getCommonData/JGQJJYGM_ZZT_${url}`,
    data
  })
}
/**
 * post 价格区间规模表格
 */
export const getPriceScopeTable = (url, data) => {
  return request({
    method: 'POST',
    url: `/common/getCommonData/JGQJJYGM_LIST_${url}`,
    data
  })
}
/**
 * post 价格区间渠道柱图
 */
export const getPriceChannelList = (data) => {
  return request({
    method: 'POST',
    url: '/priceSection/pingtai',
    data
  })
}
/**
 * post 价格区间渠道柱图
 */
export const getPriceChannelData = (data) => {
  return request({
    method: 'POST',
    url: '/priceSection/qdfx',
    data
  })
}
