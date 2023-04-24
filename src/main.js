import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:windi.css'

import {router} from './router/index.js'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { createPinia } from 'pinia'

import './permission.js'

import 'nprogress/nprogress.css'

const pinia = createPinia()

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app
  .use(ElementPlus)
  .use(router)
  .use(pinia)
  .mount('#app')
