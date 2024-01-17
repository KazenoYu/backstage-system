// locale.js
import { createI18n } from "vue-i18n";
import zh from './languages/zh-TW.json';  // 導入中文翻譯
import en from './languages/en-US.json';  // 導入英文翻譯

/*
 * 獲取當前頁面的語系
 * 例如說當前的頁面是：https://www.example.com/?locale=zh-TW 
 * currentURL = https://www.example.com/?locale=zh-TW 
 * queryString = ?locale=zh-TW
 * URLLocale = zh-TW
*/

// 獲取當前頁面的 URL
const currentURL = window.location.href;

// 解析 URL 中的 query string，獲取?後面的參數
const queryString = new URL(currentURL).search

// 獲取 URL 中的 locale 參數，作為語系
const URLLocale = new URLSearchParams(queryString).get('locale');

// 獲取瀏覽器中的語言，作為語系
const browserLocale = navigator.language;

// 獲取 localStorage 中儲存的語系
const localStorageLocale = localStorage.getItem('locale');

const getLocale = () => {
let selectedLocale = '';

    // 1. 判斷緩存中是否已有緩存的語系 ( 使用者選擇過的語系 )
    if (localStorageLocale) {
        selectedLocale = localStorageLocale;
    } 
    // 2. 判斷 URL 中是否帶有語系的參數
    else  if (URLLocale) {
        selectedLocale = URLLocale;
    }
    // 3. 上述都沒有的時候，以瀏覽器的語系為基準
    else {
        selectedLocale = browserLocale;
}

// 將 selectedLanguage 存入 localStorage，供後續頁面做為參考。
localStorage.setItem('locale', selectedLocale);
return selectedLocale;
}

const i18n = createI18n({
    legacy: false, // legacy 為 false 時，才可以使用 Composition API；為 true 時，則需要使用 Options API
    locale: getLocale(), // 預設語系
    fallbackLocale: 'en', // 備用語系：未找到翻譯時，顯示的語言
    globalInjection: true, // 全域注入
    messages: {
        'zh-TW': zh,
        'en-US': en
    }
});

export  default i18n