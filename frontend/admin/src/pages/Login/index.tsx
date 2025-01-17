import { Form, Button, Input, FormInstance } from 'antd'
import { useLoginContext }  from './hooks/LoginContext.tsx'
import { LoginContextProvider } from "./hooks/LoginContext.tsx"
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { LoginContextProps, LoginForm} from "./types"
import { useMessageContext } from '../../components'
import { MessageContextProps } from '../../components/MessageContext/types'
import React, { useState } from "react"

const Login = () => {
    const [formInstance] = Form.useForm()
    const form: FormInstance<LoginForm> = formInstance
    const {
        authenticated,
        loginRequest,
        setLoginRequest,
        setAuthenticated,
    } = useLoginContext() as LoginContextProps

    const { messageApi } = useMessageContext() as MessageContextProps

    const [prevUsername, setPrevUsername] = useState<string>('')
    const [prevPassword, setPrevPassword] = useState<string>('')
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
    const onClickVisiblePassword = (visiblePassword: boolean) => {
        setVisiblePassword(!visiblePassword)
    }

    const onFinishForm = async () => {
        const loginForm: LoginForm = await form.validateFields()
        const rawUsername = loginForm.username
        const rawPassword = loginForm.password

        if (rawUsername === prevUsername && rawPassword === prevPassword) {
            messageApi.warning('Stop spamming!')
        }
        else {
            setAuthenticated(undefined)
            setPrevUsername(rawUsername)
            setPrevPassword(rawPassword)
            setLoginRequest({
                ...loginRequest,
                username: rawUsername,
                password: rawPassword,
            })
        }
    }

    React.useEffect(() => {
        if (authenticated) {
            messageApi.success('Login successfully!')
        }
        else if (authenticated === false) {
            messageApi.error('Invalid username or password!')
        }
    }, [authenticated])

    return (
        <>
            <Form form={form} onFinish={onFinishForm}>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{required: true, message: 'Please input your username'}]}>
                    <Input
                        placeholder="Enter your username"
                        required
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{required: true, message: 'Please input your password'}]}>
                    <Input.Password
                        required
                        placeholder="Enter your password"
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={visiblePassword
                            ? <EyeOutlined onClick={() => onClickVisiblePassword(visiblePassword)} />
                            : <EyeInvisibleOutlined onClick={() => onClickVisiblePassword(visiblePassword)}/>}
                    >
                    </Input.Password>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-btn">Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export const LoginPage = () => {
    return (
        <LoginContextProvider>
            <Login />
        </LoginContextProvider>
    )
}