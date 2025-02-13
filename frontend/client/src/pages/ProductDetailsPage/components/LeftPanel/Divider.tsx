import { DividerProps } from "pages/ProductDetailsPage/types"
import React from "react"

const Divider: React.FC<DividerProps> = ({ width }) => {
    return (
        <div className={ `h-[0.5px] bg-gray-500 ${ width ? `w-[${width}px]` : '' }` } />
    )
}

export default Divider