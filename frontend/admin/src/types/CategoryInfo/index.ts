import {IBaseData} from '../index.ts'

export interface CategoryInfo extends IBaseData {
    categoryId: string
    code: string | null
    name: string
}