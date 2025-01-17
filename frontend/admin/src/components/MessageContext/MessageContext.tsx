import {message} from 'antd'
import React, {ReactNode} from 'react'
import {MessageContextProps} from './types'

const MessageContext = React.createContext<MessageContextProps>({
    messageApi: message,
})

export const MessageContextProvider = ({children} : {children: ReactNode}) => {
    const [messageApi, contextHolder] = message.useMessage()
    return (
        <MessageContext.Provider value={{messageApi} as MessageContextProps}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    )
}

export const useMessageContext = () => {
    return React.useContext(MessageContext)
}