/**
 * 2024/11/16 16:56
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 请求表单模型
 * @version 1.0
 * @since 1.0
 */
import {reactive} from "vue";


/**
 * 歌手接口
 */
export interface SingerFormData {
    id: number;
    name: string;
    sex: string;
    birthday: string;
    singerPicUrl: string;
    description: string;
    nationality: string;
    albums: Array
}

/**
 * 歌手表单
 */
export const singerFormData = reactive<SingerFormData>({
    id: '',
    name: '',
    sex: 1,
    birthday: '',
    singerPicUrl: '',
    description: '',
    nationality: '',
    albums: []
})