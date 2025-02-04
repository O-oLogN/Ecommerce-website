import { SubmitButtonProps } from "./types"
import React from "react"

const SubmitButton: React.FC<SubmitButtonProps> = ({ buttonName }) => {
    return (
        <button
            className='w-[25%] ml-[560px] mt-[50px] bg-gradient-to-r bg-blue-700 border-primary border rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]'
            type='submit'
        >
            { buttonName }
        </button>
    )
}

export default SubmitButton