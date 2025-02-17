import {DropdownProps} from "pages/CheckoutPage/types"
import React from "react"

const Dropdown: React.FC<DropdownProps> = ({ name, label, clss, options, style, defaultOption }) => {
    const filteredOptions = options ? options.slice(1) : []
    return (
        <>
            <label className="ml-[15px]" htmlFor={"." + clss}>{ label }</label>
            <select
                name={ name }
                className={`${ clss } ${ style ?? '' } p-2 w-[250px]` }
                autoComplete={ options && options.length > 0 ? options[0] : '' }
                defaultValue={ defaultOption ?? '' }
            >
                <option disabled value=''>{ options[0] }</option>
                {filteredOptions.map(option => <option value={ option }>{ option }</option>
            )}
            </select>
        </>
    )
}

export default Dropdown