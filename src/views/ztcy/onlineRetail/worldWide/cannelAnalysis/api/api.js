import request from '@/utils/request'

// 全国,本地整体交易平台分析
export const getPlatformData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGZTJYPTFXI',
    data
  })
}
export const getPlatformTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QGZTJYPTFXI',
    data
  })
}
// 全国整体交易模式分析
export const getModelData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGZTJYMSFXI',
    data
  })
}
export const getModelTable = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QGZTJYMSFXI',
    data
  })
}
// 全国,本地交易平台分析-平台列表
export const getSelectList = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGZTJYPTFXPTLBIAO',
    data
  })
}
