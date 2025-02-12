import {ItemInfo} from "types"

export interface ProductDetailsProps {
}

export interface LeftPanelProps {
    product: ItemInfo | null
}

export interface DescriptionProps {
    title: string
    content: string
}

export interface ProductInfoProps {}

export interface ProductImageProps {
    imageUrl: string
}

export interface SelectableOptionProps {
    title: string
    options: string[]
}

export interface RightPanelProps {
    product: ItemInfo | null
}