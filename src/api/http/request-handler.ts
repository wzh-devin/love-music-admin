import {post, get} from "../../utils/http/axios";
import {LocalStorageEnum} from "../../enums";

/**
 * 2024/11/1 16:16
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 请求api执行器
 * @version 1.0
 * @since 1.0
 */
export class RequestHandler {

    /**
     * 单例模式，创建请求执行器
     */
    public static getInstance(): RequestHandler {
        return new RequestHandler();
    }

    /**
     * 请求登录
     */
    public async login({username, password}) {
        return post({
            url: '/admin/login',
            data: {username, password}
        }).then(
            res => {
                // 将token存入本地
                localStorage.setItem(LocalStorageEnum.AUTHORIZATION, res.data);
                return res;
            },
            error => {
                // 错误信息
                console.log(error);
                return error;
            }
        )
    }

    /**
     * 获取所有歌手信息
     */
    public async getSingerList() {
        return get({
            url: '/singer/list'
        }).then(
            res => {
                return res;
            },
            error => {
                // console.error(`错误信息: ${error}`);
                return error;
            }
        )
    }

    /**
     * 添加歌手
     * @param data
     */
    public async addSinger(data) {
        post({
            url: '/singer/add',
            data
        }).then(
            res => {
                return res;
            },
            error => {
                return error;
            }
        )
    }

    /**
     * 更新歌手信息
     * @param data
     */
    updateSingerInfo(data) {
        post({
            url: '/singer/update',
            data
        }).then(
            res => {
                return res;
            },
            error => {
                return error;
            }
        )
    }
}