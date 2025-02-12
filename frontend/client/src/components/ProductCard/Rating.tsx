import {RatingProps} from "components/types"
import React from "react"

const Rating: React.FC<RatingProps> = ({ rate, numberOfReviews }) => {
    const starsArr = []
    let t = rate
    while (Math.floor(t)) {
        t -= 1
        starsArr.push(1)
    }
    while (starsArr.length < 5) {
        starsArr.push(0)
    }
    return (
        <div className="mt-2 items-center gap-2 flex">
            <div className="flex items-center">
            {
                starsArr.map(element => {
                   return element ? <YellowStar /> : <EmptyStar />
                })
            }
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
                { rate.toFixed(1) }
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                ({ numberOfReviews })
            </p>
        </div>
    )
}

const YellowStar = () => {
    return (
        <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="currentColor" viewBox="0 0 24 24">
            <path
                d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>
        </svg>
    )
}

const EmptyStar = () => {
    return (
        <svg className="h-4 w-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="currentColor" viewBox="0 0 24 24">
            <path
                d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z"/>
        </svg>
    )
}

export default Rating