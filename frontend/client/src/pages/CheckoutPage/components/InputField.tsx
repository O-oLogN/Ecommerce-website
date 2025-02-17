import {InputFieldProps} from "pages/CheckoutPage/types"
import React from "react"

const InputField: React.FC<InputFieldProps> = ({ clss, name, label, placeholder, required, type, style, defaultValue }) => {
    return (
        <div className="flex mt-[20px]">
            <label htmlFor={"." + clss }
                   className='flex items-center justify-center mx-3 px-1 transition-all duration-300 top-3 -z-1 origin-0 text-ui-fg-subtle'
            >
                { label }
            </label>
            <input name={ name }
                   placeholder={ placeholder ?? '' }
                   required={ required ?? false }
                   className={`${clss ?? ''} ${style ?? ''} border-2 h-9 rounded-[5px] p-2 w-[250px]`}
                   type={ type ?? 'text' }
                   defaultValue={ defaultValue ?? '' }
            />
        </div>
    )
}

export default InputField