import request from './request'

export const searchApi = (keywords: string | string[], type: number, offset: number, limit: number = 30) => {
  return request({
    url: `/cloudsearch?keywords=${keywords}&type=${type}&offset=${offset}&limit=${limit}`,
    method: 'GET',
  })
}

export const hotSearchApi = () => {
  return request({
    url: `/search/hot/detail`,
    method: 'GET'
  })
}
