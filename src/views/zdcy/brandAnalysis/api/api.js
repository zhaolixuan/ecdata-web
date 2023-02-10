import request from '@/utils/request'

/**
 * get 请求样例
 */
// 当期网络零售额变化趋势
export const getCommonData = (url, data) => {
  return request({
    method: 'POST',
    url: `/common/getCommonData/${url}`,
    data: data
  })
}

/**
 * post TOP20品牌价格区间零售量分析-平台动态列表
 */
export const getTop20pingtai = (data) => {
  return request({
    method: 'POST',
    url: '/pinpaifenxi/top20pingtai',
    data
  })
}

/**
 * post TOP20品牌价格区间零售量分析数据
 */
export const getTop20ppqdfx = data => {
  return request({
    method: 'POST',
    url: '/pinpaifenxi/top20ppqdfx',
    data
  })
}

/**
 * post TOP20品牌城市零售额分析数据
 */
export const getTop20Sale4CityLevel = (url, data) => {
  return request({
    method: 'POST',
    url: `/common/getCommonData/${url}`,
    data
  })
}
