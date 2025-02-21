import {HighlightInfo} from "types"

                                                /* REQUESTS */
export interface ICreateHighlightRequest {
    content: string
}

export interface IEditHighlightRequest {
    highlightId: string
    icon: File | null
    iconMinioGetUrl: string
    iconMinioPutUrl: string
    description: string
}

                                                /* RESPONSES */
export interface ICreateHighlightResponse extends HighlightInfo {}

export interface IEditHighlightResponse extends HighlightInfo {}

export interface IDeleteHighlightResponse extends HighlightInfo {}