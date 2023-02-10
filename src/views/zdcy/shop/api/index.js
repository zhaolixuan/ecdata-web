import request from '@/utils/request'

// TOP单品分析
export const getTOPDPFXHMJJ = (data, active) => {
  return request({
    method: 'POST',
    url: '/common/pages/' + active,
    data
  })
}
