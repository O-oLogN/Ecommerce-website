import { HintProps } from "../types"
import React from "react"

const Hint: React.FC<HintProps> = ({ content }) => {
    return (
        <div className="absolute hidden opacity-0 visible w-[150px] text-[0.85rem] -top-[50px] pb-6 hover:opacity-1 hover:visible">
            { content }
        </div>
    )
}

export default Hint