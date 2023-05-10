import request from './request'

export const songUrlApi = (id: number, level: string = 'higher') => {
  return request({
    baseURL: `/song`,
    url: `/song/url/v1?id=${id}&level=${level}`,
    method: 'GET',
  })
}

export const lyricApi = (id: number) => {
  return request({
    baseURL: `/song`,
    url: `/lyric?id=${id}`,
    method: 'GET'
  })
}

export const likeSongApi = (id: string) => {
  return request.post('/like', {songId: id})
}
