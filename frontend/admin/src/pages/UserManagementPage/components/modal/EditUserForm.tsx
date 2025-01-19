import {Modal, Form, Input} from 'antd'
import React from 'react'
import {UserInfo} from 'src/types'
import {useEditUser} from '../../../../services'
import {HttpStatusCode} from 'axios'
import {IEditUserRequest} from 'src/services/types'
import {message} from 'antd'

interface EditUserFormProps {
    initialValues: UserInfo | undefined
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    editHelper: ReturnType<typeof useEditUser>
    userList?: UserInfo[] | undefined
    refetchUserList: () => void
    messageApi: typeof message
}

const handleSubmitForm = async (
    editHelper: ReturnType<typeof useEditUser>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    editRequest: IEditUserRequest,
    refetchUserList: () => void,
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
        messageApi.error(errObj.status + '::'
            + errObj.code + '::'
            + errObj.response.data.error + '-'
            + errObj.response.data.message)
    }
    finally {
        setIsOpenForm(false)
        refetchUserList()
    }
}

export const EditUserForm: React.FC<EditUserFormProps> = ({
  initialValues,
  isOpenForm,
  setIsOpenForm,
  editHelper,
  refetchUserList,
  messageApi,
}) => {
    const [form] = Form.useForm()
    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }

    React.useEffect(() => {
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
                      
                      handleSubmitForm(
                          editHelper,
                          setIsOpenForm,
                          {
                              userId,
                              username,
                              email
                          },
                          refetchUserList,
                          messageApi,
                      )
                  }}
                  initialValues={initialValues}
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
            </Form>
        </Modal>
    )
}