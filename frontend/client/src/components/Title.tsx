import {TitleProps} from "components/types"
import React from "react"

const Title: React.FC<TitleProps> = ({ content }) => {
    return (
        <div className='absolute w-full text-center top-[100px] text-3xl font-semibold'>
            <h1>{ content }</h1>
        </div>
    )
}

export default Title