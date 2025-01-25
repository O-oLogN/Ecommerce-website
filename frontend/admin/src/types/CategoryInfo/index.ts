import {IBaseData} from 'types'

export interface CategoryInfo extends IBaseData {
    categoryId: string
    code: string | null
    name: string
}