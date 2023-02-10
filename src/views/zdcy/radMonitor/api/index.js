import request from '@/utils/request'

// 原材料监测-获取所有原材料名称列表
export const getHQSYYCLMCHENG = () => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/HQSYYCLMCHENG'
  })
}

// 原材料监测-获取所有原材料名称列表
export const getYCLJGSCLBIAO = (data) => {
  return request({
    method: 'POST',
    url: '/common/pages/YCLJGSCLBIAO',
    data
  })
}
