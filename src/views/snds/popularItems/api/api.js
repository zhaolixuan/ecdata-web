import request from '@/utils/request'
// 人气单品分析
export const getBestData = data => {
  return request({
    method: 'POST',
    url: '/common/pages/RQDPFX',
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
