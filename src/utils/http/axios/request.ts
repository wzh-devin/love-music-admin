/**
 * 2024/11/1 12:44
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 基于axios封装请求
 * @version 1.0
 * @since 1.0
 */
import axios, {AxiosInstance} from "axios";

// axios实例
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NODE_HOST,
    timeout: 5000, // 超时时间
    withCredentials: true, // 允许跨域
    headers: {
        post: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" // 设置响应头
        }
    }
});

// 设置请求拦截器
axiosInstance.interceptors.request.use(
    request => {
        // 请求发送前，需要做的事情
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
        response.status === 200 ? Promise.resolve(response) : Promise.reject(response);
    },
    error => {
        // 非2**状态码
        // TODO 处理并路由到相应错误页面
        return Promise.reject(error.response);
    }
);

export default axiosInstance;


