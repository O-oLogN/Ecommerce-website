import {Modal, Form, Input, Checkbox} from 'antd'
import React, {useState, useEffect} from 'react'
import {UserInfo} from 'types'
import {useEditUser, useSearchRole} from 'services'
import {HttpStatusCode} from 'axios'
import {IEditUserRequest, ISearchRoleResponse} from 'services/types'
import {message} from 'antd'

interface EditUserFormProps {
    initialValues: UserInfo | undefined
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    editHelper: ReturnType<typeof useEditUser>
    userList?: UserInfo[] | undefined
    reFetchUserList: () => void
    messageApi: typeof message
}

type Option = {
    label: string
    value: string
}

const handleSubmitForm = async (
    editHelper: ReturnType<typeof useEditUser>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    editRequest: IEditUserRequest,
    reFetchUserList: () => void,
    messageApi: typeof message
) => {
    try {
        const editResponse = await editHelper.mutateAsync(editRequest)
        if (!editResponse) {
            console.log('editResponse is undefined')
        } else if (!editResponse.data) {
            console.log('editResponse.data is undefined')
        } else {
            if (editResponse.data.status === HttpStatusCode.Ok) {
                console.log('FORM - user updated successfully!')
                messageApi.success('User updated successfully!')
            }
            // else {
            //     console.log('FORM - user updated failed!')
            //     messageApi.error('User updated failed!')
            // }
        }
    }
    catch (error) {
        console.log('ERROR - user updated failed!')
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

export const EditUserForm: React.FC<EditUserFormProps> = ({
  initialValues,
  isOpenForm,
  setIsOpenForm,
  editHelper,
  reFetchUserList,
  messageApi,
}) => {
    const [form] = Form.useForm()
    const [checkedRoleIds, setCheckedRoleIds] = useState<string[]>([])
    const [roleOptions, setRoleOptions] = useState<Option[]>([])

    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }

    const onCheckboxGroupChange = (checkedValues: string[]) => {
        console.log('checkedValues', checkedValues)
        setCheckedRoleIds(checkedValues)
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
            const rolesFound = searchRoleResponse.data.data.content as ISearchRoleResponse[]
            const newRoleOptions = rolesFound!.map(role => ({
                label: role.name,
                value: role.roleId
            }) as Option)

            const rolesArr = initialValues && initialValues.roles ? (initialValues.roles as unknown as string).split(', ') : []
            const newDefaultRoleOptions: string[] = []
            if (rolesArr.length) {
                rolesArr.forEach(roleName => {
                    newDefaultRoleOptions.push(rolesFound!.find(role =>
                        role.name === roleName
                    )!.roleId)
                })
            }

            setRoleOptions(newRoleOptions)
            setCheckedRoleIds(newDefaultRoleOptions)
        }
    }, [searchRoleResponse.data, initialValues])


    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues)
        }
    }, [initialValues, form])

    return (
        <Modal title="Update user form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as UserInfo
                      const userId = initialValues!.userId
                      const username= formVal.username
                      const email = formVal.email || null
                      const roleIds = checkedRoleIds
                      
                      await handleSubmitForm(
                          editHelper,
                          setIsOpenForm,
                          {
                              userId,
                              username,
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
                    name="email"
                    label="Email"
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    name="createUser"
                    label="Create user"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="createDatetime"
                    label="Create date time"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="modifyUser"
                    label="Modify user"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="modifyDatetime"
                    label="Modify date time"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Roles"
                >
                    <Checkbox.Group
                        options={roleOptions}
                        value={checkedRoleIds}
                        onChange={onCheckboxGroupChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}