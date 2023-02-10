import request from '@/utils/request'

// 消费者偏好分析-消费者偏好分析图
export const getXFZPHFXI = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/XFZPHFXI',
    data
  })
}
export const getXFZPHFXITable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/XFZPHFXI',
    data
  })
}
