import request from '@/utils/request'

// 细分品类交易规模分析
export const getXFPLJYGMFXIData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/XFPLJYGMFXI',
    data
  })
}
// 细分品类交易规模分析表
export const getXFPLJYGMFXITable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/XFPLJYGMFXI',
    data
  })
}
// 细分品类行业价格分析
export const getPLJYFXHYJGFXIData = data => {
  return request({
    method: 'POST',
    url: '/common/pages/PLJYFXHYJGFXI',
    data
  })
}
