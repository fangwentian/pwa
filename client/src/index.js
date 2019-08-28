import Vue from 'vue'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import ajax from '@/common/utils/ajax'

import '@/style/index.less'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Element)
Vue.use(ajax)

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})