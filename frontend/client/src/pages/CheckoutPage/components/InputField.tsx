import {InputFieldProps} from "pages/CheckoutPage/types"
import React from "react"

const InputField: React.FC<InputFieldProps> = ({ clss, name, label, placeholder, required, type }) => {
    return (
        <div className="flex">
            <input name={ name }
                   placeholder={ placeholder ?? '' }
                   required={ required ?? false }
                   className={`${clss ?? ''}`}
                   type={ type ?? 'text' }
            />
            <label htmlFor={ name }
                className='flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-ui-fg-subtle'
            >
                { label }
            </label>
        </div>
    )
}

export default InputField