import request from '@/utils/request'

// TOPεεεζ
export const getTOPDPFXHMJJ = (data, active) => {
  return request({
    method: 'POST',
    url: '/common/pages/' + active,
    data
  })
}
