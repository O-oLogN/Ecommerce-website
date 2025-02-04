export interface AlertProps {
    message: string
    description: string
}

interface Input {
    value: string
    isError: boolean
    alertMsg: string | null
}

export interface UsernameInputProps extends Input {}

export interface PasswordInputProps extends Input {
    title: string
    textHolder?: string
}

export interface AlertMsgProps {
    styles?: string
    alertMsg: string | null
}

export interface TitleProps {
    content: string
}

export interface SubmitButtonProps {
    buttonName: string
}

export interface EmailInputProps extends Input {}