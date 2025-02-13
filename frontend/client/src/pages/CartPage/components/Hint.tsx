import { HintProps } from "../types"
import React from "react"

const Hint: React.FC<HintProps> = ({ content, clss }) => {
    return (
        <div className={`${ clss } absolute hidden w-[150px] text-[0.85rem] -top-[50px] pb-6`}>
            { content }
        </div>
    )
}

export default Hint