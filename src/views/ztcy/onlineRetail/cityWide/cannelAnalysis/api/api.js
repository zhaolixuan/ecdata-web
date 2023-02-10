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


// 本地区交易平台分析-单平台分析
export const getPlatformDataName = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGZTJYPTFXI_NAME',
    data
  })
}
export const getPlatformTableName = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QGZTJYPTFXI_NAME',
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
