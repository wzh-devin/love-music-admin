/**
 * 2024/11/1 13:00
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 封装axios方法
 * @version 1.0
 * @since 1.0
 */
import axios, {AxiosRequestConfig} from "axios";
import {RequestOptions} from "./axios";

/**
 * 封装get请求
 * @param config
 * @param options
 * @return Promise
 */
export function get(config: AxiosRequestConfig, options?: RequestOptions): Promise {
    return new Promise((resolve, reject) => {
        axios.get(config.url, options)
            .then(
                // 响应成功，返回数据
                response => response(response.data),
                // 响应失败，返回错误信息
                error => reject(error)
            )
    });
}

/**
 * 封装post请求
 * @param config
 * @return Promise
 */
export function post(config: AxiosRequestConfig): Promise {
    return new Promise((resolve, reject) => {
        axios.post(config.url, config.data)
            .then(
                // 响应成功，返回数据
                response => response(response.data),
                // 响应失败，返回错误信息
                error => reject(error)
            )
    });
}

/**
 * 封装put请求
 * @param config
 * @return Promise
 */
export function put(config: AxiosRequestConfig): Promise {
    return new Promise((resolve, reject) => {
        axios.post(config.url, config.data)
            .then(
                // 响应成功，返回数据
                response => response(response.data),
                // 响应失败，返回错误信息
                error => reject(error)
            )
    });
}

/**
 * 封装delete请求
 * @param config
 * @return Promise
 */
export function del(config: AxiosRequestConfig): Promise {
    return new Promise((resolve, reject) => {
        axios.post(config.url, config.data)
            .then(
                // 响应成功，返回数据
                response => response(response.data),
                // 响应失败，返回错误信息
                error => reject(error)
            )
    });
}

/**
 * 获取基础的Url
 * @return string
 */
export function getBaseUrl(): string {
    return import.meta.env.VITE_APP_BASE_URL;
}