import request from '@/utils/request'

export const getGLXFXSJU = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/GLXFXSJU',
    data
  })
}

export const getGLXFXSJUCS = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/GLXFXSJU_CS',
    data
  })
}

export const getGLXFXSJUCSMAP = data => {
  return request({
    method: 'POST',
    url: '/common/getCommonData/GLXFXSJU_CS_MAP',
    data
  })
}
