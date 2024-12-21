/**
 * 2024/12/5 23:15
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description websocket组件的规则制定
 * @version 1.0
 * @since 1.0
 */

/**
 * websocket的选项
 */
export interface WsOptions {
    // 设置心跳间隔
    heartbeatInterval?: number;
    // 设置重连间隔
    reconnectInterval?: number;
    // 设置最大重连次数
    maxReconnectTimes?: number;
}

/**
 * websocket的连接状态
 */
export enum WsStatus {
    CONNECTING = {
        status: 0,
        desc: '正在连接...'
    },
    CONNECTED = {
        status: 1,
        desc: '连接已建立'
    },
    DISCONNECTING = {
        status: 2,
        desc: '正在断开...'
    },
    DISCONNECTED = {
        status: 3,
        desc: '连接已断开'
    }
}