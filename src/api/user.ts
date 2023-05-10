import request from './request'

export const userDetailsApi = (id: number | string | string[]) => {
  return request({
    url: `/user/detail?uid=${id}`,
    method: 'GET',
  })
}

export const userPlaylistApi = (id: number | string | string[]) => {
  return request({
    url: `/user/playlist?uid=${id}`,
    method: 'GET',
  })
}

export const userFollowsApi = (id: number | string | string[]) => {
  return request({
    url: `/user/follows?uid=${id}&limit=99`,
    method: 'GET',
  })
}

export const userFollowedsApi = (id: number | string | string[]) => {
  return request({
    url: `/user/followeds?uid=${id}&limit=99`,
    method: 'GET',
  })
}

export const userInfoApi = () => {
  return request({
    url: `/user/info`,
    method: 'GET',
  })
}

export const userLikeSongsApi = () => {
  return request({
    url: `/like`,
    method: 'GET',
  })
}

export const userLikePlaylistsApi = () => {
  return request({
    url: `/playlists/like`,
    method: 'GET',
  })
}
export const userCreatePlaylistsApi = () => {
  return request({
    url: `/playlists`,
    method: 'GET',
  })
}
