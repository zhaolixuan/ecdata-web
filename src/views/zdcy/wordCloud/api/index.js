import request from '@/utils/request'

// 词分析-产业热词-产业热词分析图
export const getCYRCFXI = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/CYRCFXI',
    data
  })
}
