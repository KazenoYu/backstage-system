import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
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
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;` // 全域 scss 變數
      }
    }
  },
  build: {
    rollupOptions: {
      // input: getEntryPath() // 獲取 MPA 專案的所有入口頁面
    }
  }
})
