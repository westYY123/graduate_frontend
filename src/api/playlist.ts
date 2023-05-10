import request from './request'

export const playlistDetailsApi = (id: number | string | string[]) => {
  return request({
    url: `/playlists`,
    method: 'GET',
  })
}

export const songDetailsApi = (ids: string) => {
  return request({
    url: `/playlist?playlistId=${ids}`
  })
}

export const getPlayListDetail = (id: any) => {
  return request({
    url: `/playlist?playlistId=${id}`,
    method: 'GET'
  })
}
