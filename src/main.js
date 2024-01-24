import 'vuetify/styles' // Vuetify styles
import '@/styles/main.scss' // global css
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'
import i18n from './i18n/locale'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives
})
app.use(createPinia()).use(router).use(vuetify).use(i18n)
app.mount('#app')
