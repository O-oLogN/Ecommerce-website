import {AlertMsgProps} from "components/types"
import React from "react"

const AlertMsg: React.FC<AlertMsgProps> = ({ styles, alertMsg }) => {
    return (
        <p className={ (styles ?? '') + ' text-red-700' }>{ alertMsg }</p>
    )
}

export default AlertMsg