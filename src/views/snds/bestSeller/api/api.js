import request from '@/utils/request'
// 畅销单品分析
export const getBestData = data => {
  return request({
    method: 'POST',
    url: '/common/pages/CXDPFX',
    data
  })
}
// 平台列表
export const getPlatformData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/SNDS_DPFX_PT_LIST',
    data
  })
}
