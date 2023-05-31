import request from './request'

export const searchSongApi = (keywords: string | string[]) => {
  return request({
    url: `/songs/search?keywords=${keywords}`,
    method: 'GET',
  })
}

export const hotSearchApi = () => {
  return request({
    url: `/search/hot/detail`,
    method: 'GET'
  })
}
