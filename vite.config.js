import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path'
// import fs from 'fs'

// const npm_config_module = process.env.npm_config_module || '';

// 獲取 MPA 專案的所有入口頁面
// const getEntryPath = () => {
//   const pathMap = {}
//   const modules = fs.readdirSync(resolve(__dirname, 'src/modules'))
//   modules.forEach(module => {
//     pathMap[module] = resolve(__dirname, `src/modules/${module}/index.html`)
//   })
//   return pathMap
// }

export default defineConfig({
  // root:"src/modules", // 打包 MPA 專案時啟用的根目錄
  // root:npm_config_module? resolve(__dirname, `./src/modules/${npm_config_module}`) : resolve(__dirname),
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @use "@/styles/variables.scss" as *; 
            @use "@/styles/mixin.scss" as *;
          ` // 全域 scss 變數
      }
    }
  },
  server: {
    // host: 0.0.0.0, //允許區網透過你的 IP 訪問應用 ( 可選 )
    proxy: {
      '/api': {
        target: 'https://gw.openapi.org.tw', // 政府的 openapi 服務
        changeOrigin: true, // 是否改寫 origin，true 時會把 header 中的 origin，改成跟 target 一樣的 URL
        rewrite: (path) => path.replace(/^\/api/, '') // 把 /api 開頭的這一段替換為空
      },
      '/weatherApi': {
        target: 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/', // 政府的 天氣 openapi 服務
        changeOrigin: true, // 是否改寫 origin，true 時會把 header 中的 origin，改成跟 target 一樣的 URL
        rewrite: (path) => path.replace(/^\/weatherApi/, '') // 把 /weather 開頭的這一段替換為空
      },
      demoApi: {
        target: 'http://192.168.1.203:9080/erp_backend_service/demo', // 輔翼的 demo
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/demoApi/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      // input: getEntryPath() // 獲取 MPA 專案的所有入口頁面
    }
  }
})
