/**
 * 2024/12/5 23:13
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 封装websocket方法的组件
 * @version 1.0
 * @since 1.0
 */
import {WsOptions, WsStatus} from "./ws.d.ts";

export class Ws {
    // ws请求地址
    public url: string;
    // ws响应数据
    public msg: any;
    // ws连接实例
    public ws: WebSocket | null;
    // ws选项
    public options: WsOptions;
    // ws状态
    public status: WsStatus;
    // 心跳定时器
    private heartbeatTimer: any | null;
    // 设置重连次数
    private reconnectTimes = 0;
    // 重连定时器
    private reconnectTimer: any | null;

    constructor(url: string, options: WsOptions = {}) {
        this.url = url;
        this.init(options);
    }

    // 获取链接
    public static getInstance(url: string, options: WsOptions = {}) {
        return new Ws(url, options);
    }

    // 初始化连接
    public init(options: WsOptions = {}) {
        this.options = options;
        this.status = WsStatus.DISCONNECTED;
    }

    // 连接方法
    public connect() {
        // 连接赋值
        this.ws = new WebSocket(this.url);
        if (this.ws && this.status === WsStatus.DISCONNECTED || WsStatus.DISCONNECTING) {
            console.log('WS正在连接...');
            this.status = WsStatus.CONNECTING;
            // 开启连接
            this.ws.onopen = () => {
                console.log('WS连接成功');
                this.status = WsStatus.CONNECTED;
                // 开启心跳轮询
                this.heartbeat();
            };

            // 连接断开
            this.ws.onclose = () => {
                console.log('WS正在重连...');
                // 尝试重连
                this.reconnectTimer = setTimeout(() => {
                    this.connect();
                }, this.options.reconnectInterval ? this.options.reconnectInterval : 1000);
                this.reconnectTimes++;
                if (this.reconnectTimes >= (this.options.maxReconnectTimes ? this.options.maxReconnectTimes : 5)) {
                    console.log('WS重连失败');
                    // 关闭重连定时器
                    clearTimeout(this.reconnectTimer);
                    // 关闭连接
                    this.disconnect();
                }
            };

            // 连接错误
            this.ws.onerror = (error: any) => {
                console.log('WS连接错误', error);
            }

            // 接收消息
            this.ws.onmessage = (data: any) => {
                console.log('收到消息...', data);
                this.msg = JSON.parse(data);
            }
        }
    }

    // 心跳轮询质检
    private heartbeat() {
        this.stopHeartbeat();
        // 定时发送心跳
        this.heartbeatTimer = setInterval(() => {
            console.log('WS发送心跳...');
            this.ws?.send(JSON.stringify({
                type: 'ping'
            }));
        }, this.options.heartbeatInterval ? this.options.heartbeatInterval : 3000);
    }

    // 停止心跳轮询
    private stopHeartbeat() {
        clearInterval(this.heartbeatTimer);
    }

    // 断开连接
    public disconnect() {
        let isConnected = this.status === WsStatus.CONNECTING
            || this.status === WsStatus.CONNECTED;
        if (this.ws && isConnected) {
            console.log('WS断开连接...');
            // 连接初始化
            this.init();
            // 停止心跳
            this.stopHeartbeat();
            // 关闭连接
            this.ws.close(1000, 'WS断开连接');
            this.ws = null;
        }
    }
}


export function getWsBaseURL(): string {
    return import.meta.env.VITE_APP_WS_URL;
}
