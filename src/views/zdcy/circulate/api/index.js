import request from '@/utils/request'

// 产品流通分析
export const getMapData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/CHANPINLIUTONGFENXI_AREA',
    data
  })
}
export const getTopData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/CHANPINLIUTONGFENXI_TOP10',
    data
  })
}
