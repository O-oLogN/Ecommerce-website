import {UsernameInputProps} from 'components/types'
import ErrorOutlined from './ErrorOutlined.tsx'
import AlertMsg from './AlertMsg.tsx'
import React from "react"

const UsernameInput: React.FC<UsernameInputProps> = ({ value, isError, alertMsg }) => {
    return (
        <div className='ml-[560px]'>
            <label className='mb-[10px] block text-base font-medium text-dark dark:text-white
                mt-[200px]'>
                Username
            </label>
            <div className='relative'>
                <input
                    type='text'
                    defaultValue={ value }
                    placeholder='Your username here'
                    className='w-[40%] bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
                />
                <span className='absolute top-1/2 left-4 -translate-y-1/2'>
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.72 12.886a4.167 4.167 0 0 1 2.947-1.22h6.666a4.167 4.167 0 0 1 4.167 4.167v1.666a.833.833 0 1 1-1.667 0v-1.666a2.5 2.5 0 0 0-2.5-2.5H6.667a2.5 2.5 0 0 0-2.5 2.5v1.666a.833.833 0 1 1-1.667 0v-1.666a4.17 4.17 0 0 1 1.22-2.947ZM10 3.333a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-4.166 2.5a4.167 4.167 0 1 1 8.333 0 4.167 4.167 0 0 1-8.333 0Z"
                            opacity={0.8}
                            fillRule="evenodd"
                            clipRule="evenodd"
                            fill="#9CA3AF"
                        />
                    </svg>
                </span>
                { isError && <ErrorOutlined styles={ 'absolute top-1/2 right-[61%] -translate-y-1/2' } /> }
            </div>
            { isError && <AlertMsg
                styles={'mt-[10px]'}
                alertMsg={ alertMsg }/> }
        </div>
    )
}

export default UsernameInput
