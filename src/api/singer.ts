import request from './request'

export const singerDetailsApi = (id: number | string | string[]) => {
  return request({
    url: `/artist/detail?id=${id}`,
    method: 'get'
  })
}

export const singerHotSongApi = (id: number | string | string[]) => {
  return request({
    url: `/artist/top/song?id=${id}`,
    method: 'get'
  })
}

export const singerAlbumApi = (id: number | string | string[]) => {
  return request({
    url: `/artist/album?id=${id}`,
    method: 'get'
  })
}

export const singerMVApi = (id: number | string | string[], offset: number, limit: number) => {
  return request({
    url: `/artist/mv?id=${id}&offset=${offset}&limit=${limit}`,
    method: 'GET',
  })
}
