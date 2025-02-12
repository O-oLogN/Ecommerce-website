import {UserInfo, ItemInfo, CategoryInfo} from "types"

                                        /* REQUEST */
/* Auth */
export interface ILoginRequest {
    username: string
    password: string
}

export interface ISignUpRequest {
    username: string
    password: string
    email: string
}

/* Item */
export interface ISearchItemRequest {
    itemName: string
}

export interface ISearchItemCategoryRequest {
    categoryId: string
}


                                        /* RESPONSE */
/* Auth */
export interface ISignUpResponse extends UserInfo {}

/* Item */
export interface ISearchItemResponse extends ItemInfo {}

export interface ISearchItemCategoryResponse extends CategoryInfo {}