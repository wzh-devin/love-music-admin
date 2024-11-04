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
        component: () => import('../views/Login.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/music',
                name: 'music',
                component: () => import('../views/subpages/Music.vue')
            },
            {
                path: '/singer',
                name: 'singer',
                component: () => import('../views/subpages/Singer.vue')
            },
            {
                path: '/album',
                name: 'album',
                component: () => import('../views/subpages/Album.vue')
            },
            {
                path: '/systemManager',
                name: 'systemManager',
                component: () => import('../views/subpages/SystemManager.vue')
            }
        ]
    }
];

export default routes;