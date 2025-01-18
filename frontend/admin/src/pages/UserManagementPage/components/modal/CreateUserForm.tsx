import {Modal, Form, Input} from 'antd'
import React, {useState} from 'react'
import {UserInfo} from 'src/types'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import {useCreateUser} from '../../../../services'
import {HttpStatusCode} from 'axios'
import {ICreateUserRequest} from 'src/services/types'

interface CreateUserFormProps {
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    createHelper: ReturnType<typeof useCreateUser>
    refetchUserList: () => void
}

const handleSubmitForm = async (
    createHelper: ReturnType<typeof useCreateUser>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    createRequest: ICreateUserRequest,
    refetchUserList: () => void,
) => {
    const createResponse = await createHelper.mutateAsync(createRequest)
    if (!createResponse) {
        console.log('createResponse is undefined')
    }
    else if (!createResponse.data) {
        console.log('createResponse.data is undefined')
    }
    else {
        if (createResponse.data.status === HttpStatusCode.Ok) {
            console.log('FORM - user created successfully!')
        }
        else {
            console.log('FORM - user created failed!')
        }
    }
    setIsOpenForm(false)
    refetchUserList()
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
                                                              isOpenForm,
                                                              setIsOpenForm,
                                                              createHelper,
                                                              refetchUserList,
                                                          }) => {
    const [form] = Form.useForm()
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
    const onClickVisiblePassword = (visiblePassword: boolean) => {
        setVisiblePassword(!visiblePassword)
    }
    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }
    return (
        <Modal title="Create user form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as UserInfo
                      const username= formVal.username
                      const password = formVal.password
                      const email = formVal.email || null

                      handleSubmitForm(
                          createHelper,
                          setIsOpenForm,
                          {
                              username,
                              password,
                              email
                          },
                          refetchUserList,
                      )
                  }}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{required: true, message: 'Username is required'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{required: true, message: 'Password is required'}]}
                >
                    <Input.Password
                        suffix={visiblePassword
                            ? <EyeOutlined onClick={() => onClickVisiblePassword(visiblePassword)} />
                            : <EyeInvisibleOutlined onClick={() => onClickVisiblePassword(visiblePassword)}/>}

                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                >
                    <Input type="email" />
                </Form.Item>
            </Form>
        </Modal>
    )
}