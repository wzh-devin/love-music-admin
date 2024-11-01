/**
 * 2024/11/1 18:14
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 路由配置
 * @version 1.0
 * @since 1.0
 */
import {createRouter, createWebHistory} from "vue-router";
import routes from "./routes.ts";

const history = createWebHistory();

const router = createRouter({
    history,
    routes
})

export default router;