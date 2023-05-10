import axios from 'axios'

let url = ''

if (process.env.NODE_ENV === "development") {
  url = '/api'
} else {
  url = 'http://1.117.65.130:8080/'
}

const requests = axios.create({
  baseURL: url,
  timeout: 8000,
  withCredentials: true,
})

const token =

requests.interceptors.request.use((config: any) => {
  config.headers.common['Authorization']='Bearer ' + localStorage.getItem('token')
  config.headers['Content-Type']= 'multipart/form-data'
  return config
})

requests.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    console.log('error', error)
    return Promise.reject(error)
  }
)

export default requests
