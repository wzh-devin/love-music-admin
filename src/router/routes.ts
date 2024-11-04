/**
 * 2024/11/1 18:16
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 路由配置
 * @version 1.0
 * @since 1.0
 */
import {RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'login',
        component: () => import('../view/Login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../view/Home.vue')
    }
];

export default routes;