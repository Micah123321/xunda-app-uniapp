import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
// 安装emoji
import EvanEmoji from '@/uni_modules/evan-emoji/utils/index.js'
Vue.use(EvanEmoji)
import store from './store'

Vue.prototype.$store = store

const app = new Vue({
	store,
	...App
})

app.$mount()


// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return { app }
}
// #endif
