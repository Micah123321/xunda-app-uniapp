import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		'username': 'Micah',
		'age': 18
	},
	mutations: {
		changeUserName(state, name) {
			state.username = name
		}
	},
	actions: {}
})
export default store
