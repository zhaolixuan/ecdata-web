import request from '@/utils/request'

/**
 * post 全国整体跨境进口网络零售额
 */
export const getWorldSaleData = (data) => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGZTKJJKWLLSEFXI',
    data
  })
}

/**
 * post 全国整体跨境进口网络零售额表单列表
 */
export const getWorldSaleTableData = (data) => {
  return request({
    method: 'POST',
    url: '/common/pages/QGZTKJJKWLLSEFXI',
    data
  })
}

/**
 * post 全国整体进口商品大类分析图
 */
export const getNationProductTypeChartData = (data) => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGZTJKSPDLFXI',
    data
  })
}
/**
 * post 全国整体进口商品大类分析表
 */
export const getNationProductTypeDataByPage = (data) => {
  return request({
    method: 'POST',
    url: '/common/pages/QGZTJKSPDLFXI',
    data
  })
}

/**
 * post 全国整体进口商品产地网络零售额分析图
 */
export const getNationProductPlaceChartData = (data) => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGZTJKSPCDWLLSEFXI',
    data
  })
}
/**
 * post 全国整体进口商品产地网络零售额分析表
 */
export const getNationProductPlaceDataByPage = (data) => {
  return request({
    method: 'POST',
    url: '/common/pages/QGZTJKSPCDWLLSEFXI',
    data
  })
}

/**
 * post 全国整体进口商品渠道网络零售额分析图
 */
export const getNationProductChannelChartData = (data) => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QGZTJKSPJYPTFXI',
    data
  })
}
/**
 * post 全国整体进口商品渠道网络零售额分析表
 */
export const getNationProductChannelDataByPage = (data) => {
  return request({
    method: 'POST',
    url: '/common/pages/QGZTJKSPJYPTFXI',
    data
  })
}