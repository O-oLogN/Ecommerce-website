import {PasswordInputProps} from "components/types"
import React from "react"
import ErrorOutlined from "components/ErrorOutlined.tsx"
import AlertMsg from "components/AlertMsg.tsx"

const PasswordInput: React.FC<PasswordInputProps> = ({ title, textHolder, value, isError, alertMsg }) => {
    return (
        <div className='ml-[560px] -mt-[180px]'>
            <label className='mb-[10px] block text-base font-medium text-dark dark:text-white
                mt-[200px]'>
                { title }
            </label>
            <div className='relative'>
                <input
                    type='password'
                    defaultValue={ value }
                    placeholder={ textHolder }
                    className='w-[40%] bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-12 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
                />
                <span className='absolute top-[27px] left-3.5 -translate-y-1/2'>
                    <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 4C7 1.79086 8.79086 0 11 0C13.2091 0 15 1.79086 15 4C15 6.20914 13.2091 8 11 8C10.0756 8 9.22452 7.68646 8.54718 7.15993L5.20711 10.5L6.85355 12.1464L6.14645 12.8536L4.5 11.2071L3.20711 12.5L4.85355 14.1464L4.14645 14.8536L2.5 13.2071L0.853553 14.8536L0.146447 14.1464L7.84007 6.45282C7.31354 5.77548 7 4.92436 7 4ZM11 1C9.34315 1 8 2.34315 8 4C8 5.65685 9.34315 7 11 7C12.6569 7 14 5.65685 14 4C14 2.34315 12.6569 1 11 1Z"
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

export default PasswordInput