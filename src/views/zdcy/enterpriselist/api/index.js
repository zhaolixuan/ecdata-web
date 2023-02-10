import request from '@/utils/request'

// 原材料监测-优秀企业名单-列表
export const getYXQYMDLBIAO = data => {
  return request({
    method: 'POST',
    url: '/common/pages/YXQYMDLBIAO',
    data
  })
}
