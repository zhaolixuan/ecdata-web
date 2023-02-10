import request from '@/utils/request'

export const getBaseData = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntBasicInfoByName',
    data: data
  })
}
// 核心技术人员
export const getKeyTech = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntKeyTechStaffByName',
    data: data
  })
}
// 企业评分
export const getScoreData = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntScoreFromShuke',
    data: data
  })
}
// 公司实际控制人
export const getActualController = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntActualControllerByName',
    data: data
  })
}
// 股东及其实际控制人
export const getAcHolder = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntSharholderAndACByName',
    data: data
  })
}
// 对外下属投资
export const getInvestors = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntInvestByName',
    data: data
  })
}
// 合资合作方
export const getCooperate = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntJVByName',
    data: data
  })
}
// 借贷担保关系方
export const getDebit = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntDebitByName',
    data: data
  })
}
// 关联自然人
export const getStackHolder = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntStackHolderByName',
    data: data
  })
}
// 供应链关系方
export const getRelatedParty = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntRelatedPartyByName',
    data: data
  })
}
// 资产租赁托管关系方
export const getAssetsCusto = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntAssetsCustodyByName',
    data: data
  })
}
// 股权托管关系方
export const getShareTrustee = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntShareTrusteeByName',
    data: data
  })
}
// 法律诉讼关系方
export const getFLSSInfo = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntFLSSInfoByName',
    data: data
  })
}
// 经营状况
export const getAnnualReport = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntAnnualReportByName',
    data: data
  })
}
// 专利信息
export const getPatent = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntPatentByName',
    data: data
  })
}
// 软件著作权
export const getSoftware = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntSoftwareByName',
    data: data
  })
}
//作品著作权
export const getCopyright = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntCopyrightWorksByName',
    data: data
  })
}
//商标
export const getTrademark = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntTrademarkByName',
    data: data
  })
}
//网站备案
export const getWebsite = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getEntWebsiteByName',
    data: data
  })
}
export const getSimilarData = (data) => {
  return request({
    method: 'POST',
    url: '/common/ent/getSimilarEntByIndustry',
    data: data
  })
}