import Vue from 'vue'
import Router from 'vue-router'
import view from './helpers/view'
import store from '../store'

Vue.use(Router);

const routerConfig = {
    mode: 'history',
    routes: [
        {
            path: '/',
            component: view('index/index'),
            meta: {
                pageTitle: '首页'
            }
        }
    ]
}

const router = new Router(routerConfig);

router.beforeEach((to, from, next) => {
    console.log(`you are going to`, to);
    store.dispatch('setRouteMeta', {
        pageTitle: to.meta.pageTitle || ''
    })

    next();
});

export default router;
