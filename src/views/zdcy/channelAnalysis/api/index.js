import request from '@/utils/request'

// 渠道分析-产业各电商渠道网络零售额占比分析
export const getCYGDSQDWLLSEZBFXI = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/CYGDSQDWLLSEZBFXI',
    data
  })
}
export const getCYGDSQDWLLSEZBFXITable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/CYGDSQDWLLSEZBFXI',
    data
  })
}
// 渠道分析-产业渠道网络零售额TOP10店铺
export const getCYQDWLLSETOP10DPU = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/CYQDWLLSETOP10DPU',
    data
  })
}
