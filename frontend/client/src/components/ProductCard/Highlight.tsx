import {HighlightProps} from "components/types"
import React from "react"

const Highlight: React.FC<HighlightProps> = ({ content }) => {
    return (
        <span className="me-2 mt-[10px] block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
              {" "}
            { content }
        </span>
    )
}

export default Highlight