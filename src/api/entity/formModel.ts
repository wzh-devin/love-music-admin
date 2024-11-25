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
    nationality: ''
})

/**
 * 专辑表单实体数据
 */
export interface AlbumFormData {
    id: number;
    name: string;
    releaseTime: string;
    description: string;
    singerId: number;
    singerName: string;
    musicTotal: number;
}

/**
 * 歌曲表单内实体数据
 */
export interface MusicFormData {
    id: number;
    singerId: number;
    albumId: number;
    singerName: string;
    albumName: string;
    name: string;
    musicUrl: string;
    musicPicUrl: string;
    description: string;
}