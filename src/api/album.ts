import request from './request'

export const albumDetailsApi = (id: number | string | string[]) => {
  return request({
    url: `/album?id=${id}`,
    method: 'GET',
  })
}
