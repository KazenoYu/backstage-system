import axios from 'axios'
// import { getCurrentInstance } from 'vue'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify()

const interceptors = axios.create({
  // baseURL: import.meta.env.VITE_APP_API,
  // baseURL: '/weatherApi',
  timeout: 5000 // 請求時間超時 5 秒
})

// 攔截請求
interceptors.interceptors.request.use(
  (config) => {
    console.log('config', config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 攔截回應
interceptors.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      // 撰寫 404 not found 的對應處理
      vuetify.app.$vuetify.notify({
        text: 'Error Code: 404',
        color: 'error'
      })
      console.error('Error Code: 404')
    }
    return Promise.reject(error)
  }
)

export default interceptors
