import request from '@/utils/request'

// 产业总览标签
export const getCYZLBQIN = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/CYZLBQIN',
    data
  })
}
// 产业网络零售市场交易规模变化趋势
export const getCYWLLSSCJYGMBHQSHI = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/CYWLLSSCJYGMBHQSHI',
    data
  })
}
// 产业概况-产业网络零售市场交易规模变化趋势表
export const getpagesCYWLLSSCJYGMBHQSHI = data => {
  return request({
    method: 'POST',
    url: '/common/pages/CYWLLSSCJYGMBHQSHI',
    data
  })
}
// 产业概况-产业网络零售市场累计交易规模变化趋势表
export const getpagesCYWLLSSCLJJYGMBHQSHI = data => {
  return request({
    method: 'POST',
    url: '/common/pages/CYWLLSSCLJJYGMBHQSHI',
    data
  })
}
// 产业概况-产业网络零售市场累计交易规模变化趋势图
export const getCYWLLSSCLJJYGMBHQSHI = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/CYWLLSSCLJJYGMBHQSHI',
    data
  })
}
