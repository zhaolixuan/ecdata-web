/*
 * @Author: diaolili
 * @Date: 2020-12-03 12:06:57
 * @Description: 登录等通用功能接口
 */
import request from '@/utils/request'

/**
 * post 用户登录
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/user/login'
  })
}

/**
 * get 获取用户信息
 */
export const getUserInfo = params => {
  return request({
    method: 'GET',
    url: '/user/getUserInfo',
    params
  })
}

/**
 * get 获取菜单
 */
export const getMenuData = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/HQYHCDAN',
    data
  })
}