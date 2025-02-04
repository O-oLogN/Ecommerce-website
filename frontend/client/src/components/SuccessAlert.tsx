import {Alert} from 'antd'
import { AlertProps } from './types'
import React from "react"

const SuccessAlert: React.FC<AlertProps> = ({ message, description }) => {
    return (
        <Alert
            message={ message }
            description={ description }
            type="success"
            closable
        />
    )
}

export default SuccessAlert