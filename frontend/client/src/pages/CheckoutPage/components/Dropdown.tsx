import {DropdownProps} from "pages/CheckoutPage/types"
import React from "react"

const Dropdown: React.FC<DropdownProps> = ({ name, clss, options }) => {
    const filteredOptions = options ? options.slice(1) : []
    return (
        <select
            name={ name }
            className={`${ clss }`}
            autoComplete={ options && options.length > 0 ? options[0] : '' }
        >
            <option disabled value=''>{ options[0] }</option>
            { filteredOptions.map(option =>
                <option value={ option }>{ option }</option>
            ) }
        </select>
    )
}

export default Dropdown