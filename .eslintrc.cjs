/* eslint-env node */

// 引入 Rush Stack 處理現代模塊的解析
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  // ESLint 配置的根文件
  root: true,

  extends: [
    // 使用 Vue.js 3.x 基本配置，包含了 Vue 推薦的規則
    'plugin:vue/vue3-essential',
    // 使用 ESLint 推薦的基本配置
    'eslint:recommended',
    // 禁用與 Prettier 衝突的 ESLint 格式規則
    '@vue/eslint-config-prettier/skip-formatting',
    // 使用 Airbnb 的 JavaScript 規則
    'airbnb-base',
    // 啟用 Prettier 推薦的配置，包括與 ESLint 配合使用的規則
    'plugin:prettier/recommended'
  ],

  parserOptions: {
    // 指定 ECMAScript 的版本為最新版本
    ecmaVersion: 'latest'
  },

  rules: {
    // 關閉 Vue 組件名稱應使用多個單詞的規則
    'vue/multi-word-component-names': 'off',
    // 關閉 vue/valid-template-root 規則，因為 Vue3 已經允許多個根 template
    'vue/valid-template-root': 'off',
    // 規定在某些情況下，import 的時候不能使用 devDependencies
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  },

  settings: {
    'import/resolver': {
      alias: {
        // 定義模塊解析時的別名，將 '@' 映射到 './src'
        map: [['@', './src']],
        // 定義允許的模塊文件擴展名
        extensions: ['.js', '.vue']
      }
    }
  }
}
