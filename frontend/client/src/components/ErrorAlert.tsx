import {Alert} from 'antd'
import { AlertProps } from './types'
import React from "react"

const SuccessAlert: React.FC<AlertProps> = ({ message, description }) => {
    return (
        <Alert
            message={ message }
            description={ description }
            type="error"
            closable
        />
    )
}

export default SuccessAlert