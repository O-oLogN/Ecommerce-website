import React from "react"
import {BadgeProps} from "components/types"

const Badge: React.FC<BadgeProps> = ({ iconUrl, description }) => {
    return (
        <>
            { <img src={ iconUrl ?? '#' } alt='@' className='w-6 h-6' /> }
            <p className='text-[1.15rem] mb-[5px] mt-[5px] font-medium text-gray-500 dark:text-gray-400'>
                { description }
            </p>
        </>
    )
}

export default Badge