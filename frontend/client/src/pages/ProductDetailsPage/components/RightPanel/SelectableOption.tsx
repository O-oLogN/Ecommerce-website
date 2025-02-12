import { SelectableOptionProps } from "pages/ProductDetailsPage/types"
import React, {useState} from "react"

const SelectableOption: React.FC<SelectableOptionProps> = ({ title, options }) => {
    const [selectedOption, setSelectedOption] = useState<string>('')
    const onOptionSelected = (option: string) => {
        setSelectedOption(option)
    }

    return (
        <div className="mb-[30px]">
            <p className="mb-[10px] text-[1rem]">{ title }</p>
            <div className="flex">
                { options.map(option => {
                    return (
                        <div className={ `text-center border-[1px] px-[70px] py-[10px] rounded-[7px]
                                        ${ option === selectedOption ? 'border-blue-500' : '' }
                                        hover:cursor-pointer mx-[5px]` }
                            onClick={ () => onOptionSelected(option) }
                        >
                            { option }
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default SelectableOption