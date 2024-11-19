import {RouterPath} from "../enums";
import {LocationQueryRaw, useRouter} from "vue-router";
import router from "../router";

/**
 * 2024/11/3 19:10
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 路由跳转管理
 * @version 1.0
 * @since 1.0
 */

interface RouterOptions {
    path?: string;
    query?: LocationQueryRaw;
}

export class RouterManager {
    public static skipRoute(options: RouterOptions): void {
        switch (options.path) {
            case RouterPath.Home:
            case RouterPath.Music:
            case RouterPath.Singer:
            case RouterPath.Album:
            case RouterPath.SystemManager:
            case RouterPath.Success: {
                this.skipPush(options.path, options.query);
                break;
            }
            case RouterPath.Error: {
                this.skipPush(options.path, options.query);
                break;
            }
        }
    }

    private static skipPush(path?: string, query?: LocationQueryRaw): void {
        router.push({path, query});
    }
}