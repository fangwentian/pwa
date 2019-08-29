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

// 第1步:当你调用 register() 函数时， Service Worker 开始下载。
// 第2步:在注册过程中，浏览器会下载、解析并执行 Service Worker ()。如果在此步骤中出现任何错误，register() 返回的 promise 都会执行 reject 操作，并且 Service Worker 会被废弃。
// 第3步:一旦 Service Worker 成功执行了，install 事件就会激活
// 第4步:安装完成，Service Worker 便会激活，并控制在其范围内的一切。如果生命周期中的所有事件都成功了，Service Worker 便已准备就绪，随时可以使用了！

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
            console.log('Service worker registered success: ', reg)
        })
        .catch((err) => {
            console.error('Service worker registered failed: ', err)
        })
    })
}