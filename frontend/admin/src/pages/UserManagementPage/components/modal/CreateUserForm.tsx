import {Modal, Form, Input, Checkbox, message} from 'antd'
import React, {useEffect, useState} from 'react'
import {UserInfo} from 'types'
import {useCreateUser, useSearchRole} from 'services'
import {HttpStatusCode} from 'axios'
import {ICreateUserRequest, ISearchRoleResponse} from 'services/types'

interface CreateUserFormProps {
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    createHelper: ReturnType<typeof useCreateUser>
    reFetchUserList: () => void
    messageApi: typeof message
}

type Option = {
    label: string
    value: string
}

const handleSubmitForm = async (
    createHelper: ReturnType<typeof useCreateUser>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    createRequest: ICreateUserRequest,
    reFetchUserList: () => void,
    messageApi: typeof message,
) => {
    try {
        const createResponse = await createHelper.mutateAsync(createRequest)
        if (!createResponse) {
            console.log('createResponse is undefined')
        } else if (!createResponse.data) {
            console.log('createResponse.data is undefined')
        } else {
            if (createResponse.data.status === HttpStatusCode.Ok || createResponse.data.status === HttpStatusCode.Created) {
                console.log('FORM - user created successfully!')
                messageApi.success('User created successfully!')
            }
            // else {
            //     console.log('FORM - user created failed!')
            // }
        }
    }
    catch (error) {
        console.log('ERROR - user created failed!')
        const errObj = error as any
        messageApi.error(errObj.status + ' - '
            + errObj.code + ' - '
            + errObj.response.data.error + ' - '
            + errObj.response.data.message)
    }
    finally {
        setIsOpenForm(false)
        reFetchUserList()
    }
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
                                                              isOpenForm,
                                                              setIsOpenForm,
                                                              createHelper,
                                                              reFetchUserList,
                                                              messageApi,
                                                          }) => {
    const [form] = Form.useForm()
    const [checkedRoles, setCheckedRoles] = useState<string[]>([])
    const [roleOptions, setRoleOptions] = useState<Option[]>([])

    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }

    const onCheckboxGroupChange = (checkedValues: string[]) => {
        console.log(checkedValues)
        setCheckedRoles(checkedValues)
    }


    const searchRoleResponse = useSearchRole({
        sample: {
            roleName: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 100,
        },
        ordersBy: {

        }
    })

    useEffect(() => {
        if (!searchRoleResponse.data) {
            console.log('searchRoleResponse.data is undefined')
        }
        else {
            console.log('searchRoleResponse', searchRoleResponse.data.data.content)
            const rolesFound =  searchRoleResponse.data.data.content as ISearchRoleResponse[]
            const newRoleOptions = rolesFound!.map(role => ({
                label: role.name,
                value: role.roleId
            }) as Option)

            setRoleOptions(newRoleOptions)
        }
    }, [searchRoleResponse.data]);

    return (
        <Modal title="Create user form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as UserInfo
                      const username= formVal.username
                      const password = formVal.password
                      const email = formVal.email || null
                      const roleIds = checkedRoles

                      await handleSubmitForm(
                          createHelper,
                          setIsOpenForm,
                          {
                              username,
                              password,
                              email,
                              roleIds,
                          },
                          reFetchUserList,
                          messageApi,
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
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="retypePassword"
                    label="Retype password"
                    dependencies={['password']}
                    rules={[
                        {required: true, message: 'Retype your password!'},
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    name="roles"
                    label="Roles"
                >
                    <Checkbox.Group
                        options={roleOptions}
                        onChange={onCheckboxGroupChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}