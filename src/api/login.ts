import request from './request'

export const logoutApi = () => {
  return request({
    url: `/logout?timestamp=${new Date().getTime()}`,
    method: 'GET',
  })
}

export const getAccountInfoApi = () => {
  return request({
    url: `/user/info`,
    method: 'GET',
  })
}

export const loginByPassword = (userName: string, passWord: string) => {
  return request.post('/user/login', {username: userName, password: passWord})
}
