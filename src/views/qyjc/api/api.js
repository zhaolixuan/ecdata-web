import request from '@/utils/request'

// 本地企业分析
/**
 * post 企业总数
 */
export const getEnterpriseTotalData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/BDQYSTJI'
  })
}

/**
 * post 企业列表
 */
export const getEnterpriseTableData = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QYLBIAO',
    data
  })
}

// 主导产业分析
/**
 * post 主导产业总数
 */
export const getIndustryTotalData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/ZDCYDSQYLBIAO'
  })
}

/**
 * post 主导产业企业列表
 */
export const getIndustryEnterpriseTableData = data => {
  return request({
    method: 'POST',
    url: '/common/pages/DSQYLBIAO',
    data
  })
}

// 企业变动分析
/**
 * post 本季度统计
 */
export const getQuarterlyData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QYBDFXBJDTJI',
    data: data
  })
}

/**
 * post 近一年动迁
 */
export const getLast4QuarterData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QYBDFXJYNDSQYDQFXI',
    data: data
  })
}

/**
 * post 企业来源省份分析
 */
export const getOriginalProvinceData = data => {
  return request({
    method: 'POST',
    url: '/common/pages/DSQYDQFDQTJI',
    data: data
  })
}

/**
 * post 变迁数据
 */
export const getInOutData = data => {
  return request({
    method: 'POST',
    url: '/common/pages/BDQDSQYDQLBIAO',
    data: data
  })
}

/**
 * post 注册、吊销数据
 */
export const getRegRevData = data => {
  return request({
    method: 'POST',
    url: '/common/pages/BDQDSQYZCDXLBIAO',
    data: data
  })
}

// 企业详情
/**
 * post 企业详情
 */
export const getEnterpriseInfo = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QYDAQYXXI',
    data: data
  })
}

/**
 * post 企业历近12月销售详情
 */
export const getEnterpriseSale12Month = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QYDAJ12YXSEXSLIANG',
    data: data
  })
}
/**
 * post 企业近12个月SKU上架数走势
 */
export const getEnterpriseSKU12Month = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QYJ12YSKUSJSZSTU',
    data: data
  })
}
/**
 * post 企业近12个月热销单品清单表
 */
export const getEnterpriseProductSale12Month = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QYJ12YRXDPQDAN',
    data: data
  })
}
/**
 * post 企业历史月销售详情
 */
export const getEnterpriseSaleMonth = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QYDAQYLSYFXSQKUANG',
    data: data
  })
}

/**
 * post 企业平台商铺统计
 */
export const getEnterprisePlatform = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QYDAQYPTSPTJI',
    data: data
  })
}

/**
 * post 企业商铺月份销售情况表
 */
export const getEnterprisePlatformMonth = data => {
  return request({
    method: 'POST',
    url: '/common/pages/QYSPYFXSQKUANG',
    data: data
  })
}

// 企业监测地图数据
export const getMapPoint = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/QYDTZBXXI',
    data
  })
}
