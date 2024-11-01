/**
 * 2024/11/2 0:39
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 响应实体
 * @version 1.0
 * @since 1.0
 */
export interface ApiResponse {
    isSuccess: boolean,
    errCode: string | null,
    errMsg: string | null,
    data: any | null,
    options: Options | null
}

export class Options {
    message: string;
    type: string;
}