import {post, get, del, getBaseUrl} from "../../utils/http/axios";
import {LocalStorageEnum} from "../../enums";
import axiosInstance from "../../utils/http/axios/request.ts";

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

    // TODO 获取请求头
    public getHeaders(): object {
        let headers = {};
        // axiosInstance.request().then(
        //     res => {
        //         Object.assign(headers, res.config.headers);
        //         delete headers['Content-Type'];
        //     },
        //     error => {
        //         Object.assign(headers, error.config.headers);
        //         delete headers['Content-Type'];
        //     }
        // )
        return headers;
    }

    // 上传头像的请求路径
    public getSingerHeaderImg(url: string): string {
        return `${getBaseUrl()}/${url}`;
    }

    // region +++++++++++++++++++++++++++++++++++++++++++++++++++ 登录请求方法
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
                return error;
            }
        )
    }

    // endregion ------------------------------------------------

    // region +++++++++++++++++++++++++++++++++++++++++++++++++++ 歌手请求方法
    /**
     * 获取所有歌手信息
     */
    public async getSingerList(): Promise {
        return get({
            url: '/singer/list'
        })
    }

    /**
     * 添加歌手
     * @param data
     */
    public async addSinger(data): Promise {
        return post({
            url: '/singer/add',
            data
        })
    }

    /**
     * 更新歌手信息
     * @param data
     */
    public async updateSingerInfo(data): Promise {
        return post({
            url: '/singer/update',
            data
        })
    }

    public async deleteSingerInfo(ids: number[]): Promise {
        return del({
            url: '/singer/delete',
            data: ids
        })
    }

    // endregion --------------------------------------------------


}