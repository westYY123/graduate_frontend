import request from './request'

export const hotTagApi = () => {
  return request({ url: `/playlist/hot`, method: 'GET' })
}

export const hotAlbumsApi = () => {
  return request({
    url: `/albums/hot`,
    method: 'GET',
  })
}

export const toplistApi = () => {
  return request({
    url: `/toplist/detail`,
    method: 'GET',
  })
}

export const singerlistApi = (area: number, type: number, initial: string,
  offset: number, limit: number) => {
  return request({
    url: `/artist/list?&area=${area}&type=${type}&initial=${initial}&offset=${offset}&limit=${limit}`,
    method: 'GET',
  })
}

export const dailyStarPlaylistApi = () => {
  return request({
    url: `/playlists/recommend`,
    method: 'GET',
  })
}

export const dailyStarSongsApi = () => {
  return request({
    url: `/songs/recommend`,
    method: 'GET',
  })
}

export const getHotPlayLists = () => {
  return request({
    url: '/playlists/hot',
    method: 'GET'
  })
}

export const getHotSongs = () => {
  return request({
    url: '/songs/hot',
    method: 'GET'
  })
}
