import Divider from "../LeftPanel/Divider"
import SelectableOption from "./SelectableOption"
import {RightPanelProps} from "pages/ProductDetailsPage/types"
import React from "react"

const RightPanel: React.FC<RightPanelProps> = ({ product }) => {
    return (
        <div className="mt-[180px]">
            <SelectableOption
                title="Select color"
                options={ ["Black", "Silver"] }
            />
            <SelectableOption
                title="Select Noise cancelling"
                options={ ["ANC", "None"] }
            />
            <Divider />
            <p className="mt-[20px] text-[1.7rem] font-semibold">${ (product ? product.price ?? 0 : 0).toFixed(1) }</p>
        </div>
    )
}

export default RightPanel