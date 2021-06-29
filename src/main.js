import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import VueProgressBar from '@aacassandra/vue3-progressbar'
import { loadingBarOptions } from './config/loading-bar'
import moment from 'moment'

export default createApp(App)
  .use(router)
  .use(VueProgressBar, loadingBarOptions)
  .use(store)
  .provide('moment', moment)
  .mount('#app')
