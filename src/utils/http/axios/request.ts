/**
 * 2024/11/1 12:44
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 基于axios封装请求
 * @version 1.0
 * @since 1.0
 */
import axios, {AxiosInstance, options} from "axios";
import {ErrorEnum, LocalStorageEnum, RouterPath} from "../../../enums";
import {RouterManager} from "../../../manager/router-manager.ts";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// axios实例
const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // 允许跨域
    timeout: 5000, // 超时时间
    headers: Object.assign({
        "Content-Type": "application/json;charset=UTF-8",
    })
});

// 设置请求拦截器
axiosInstance.interceptors.request.use(
    request => {
        // 从本地取出token
        const token: string | null = localStorage.getItem(LocalStorageEnum.AUTHORIZATION);
        request.headers.Authorization = token === null ? '' : `Bearer ${token}`;
        return request;
    },
    error => {
        // 发送请求失败
        return error;
    }
);

// 设置响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        // 200状态码，响应成功可以取出数据
        return response.status === 200 ? Promise.resolve(response) : Promise.reject(response);
    },
    error => {
        // 非2**状态码
        // TODO 处理并路由到相应错误页面
        if (error.code === ErrorEnum.ERR_NETWORK['code']) {
            console.log('服务器异常');
            // 转发到错误页面
            RouterManager.skipRoute({
                path: RouterPath.Error, query: {
                    message: ErrorEnum.ERR_NETWORK['errMsg']
                }
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;


