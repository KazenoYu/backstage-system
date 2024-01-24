import axios from 'axios'

// 創建 axios 實體
const axiosInterceptors = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 5000 // 請求時間超時 5 秒
})

// 請求攔截器，用於攔截請求發送前的操作
axiosInterceptors.interceptors.request.use(
  // 請求配置
  (config) => {
    // 模擬使用 token 的情況：從 local Storage 中獲取 token
    const token = localStorage.getItem('token')

    // 如果 token 存在，則添加到請求中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 返回請求配置
    return config
  },
  (error) => {
    // 返回錯誤，並向下觸發.catch
    return Promise.reject(error)
  }
)

// 響應攔截器，用於攔截響應返回前的操作
axiosInterceptors.interceptors.response.use(
  (response) => {
    console.log(`Interceptors Response, url: ${response.config.url}`)

    if (response.status !== 200) {
      console.log(response.status)
    }

    // 假如狀態碼為 500 或 502，報錯並進行後續處理
    if (response.status === 500 || response.status === 502) {
      console.log('Error Message', response.message)
      // 處理的相關程式，後續可以配合彈窗
    }
    return response
  },
  (error) => {
    // 模擬 error code 的彈窗提示
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert('身份驗證失敗，請重新登錄')
          console.log(error.message)
          break
        case 404:
          alert('找不到所請求的資源')
          console.log(error.message)
          break
        case 500:
          alert('伺服器內部錯誤，請稍後再試')
          console.log(error.message)
          break
        default:
          alert('未知的伺服器錯誤')
          console.log(error.message)
      }
    }

    if (!window.navigator.onLine) {
      alert('無法連接到網際網路，請檢查網絡連接後重試')
      return
    }
    return Promise.reject(error)
  }
)

export default service
