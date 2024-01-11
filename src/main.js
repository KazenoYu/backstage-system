import 'vuetify/styles'   // Vuetify styles

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'

import App from './App.vue'
import router from './router'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@/styles/main.scss'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')


