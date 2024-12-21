/**
 * 2024/12/14 19:58
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 状态管理工具
 * @version 1.0
 * @since 1.0
 */
import {createStore} from "vuex";
import {Ws} from "../utils/http/ws";

interface Store {
    ws: Ws
}

export default createStore<Store>({
    state: {
        ws: null
    },
    mutations: {
    },
    actions: {
    },
    modules: {
    }
})