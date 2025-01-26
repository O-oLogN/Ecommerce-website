import {Modal, Form, Input, message} from 'antd'
import React from 'react'
import {useCreateRole} from 'services'
import {HttpStatusCode} from 'axios'
import {ICreateRoleRequest} from 'services/types'

interface CreateRoleFormProps {
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    createHelper: ReturnType<typeof useCreateRole>
    reFetchRoleList: () => void
    messageApi: typeof message
}

const handleSubmitForm = async (
    createHelper: ReturnType<typeof useCreateRole>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    createRequest: ICreateRoleRequest,
    reFetchRoleList: () => void,
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
                console.log('FORM - Role created successfully!')
                messageApi.success('Role created successfully!')
            }
            // else {
            //     console.log('FORM - Role created failed!')
            // }
        }
    }
    catch (error) {
        console.log('ERROR - Role created failed!')
        const errObj = error as any
        messageApi.error(errObj.status + ' - '
            + errObj.code + ' - '
            + errObj.response.data.error + ' - '
            + errObj.response.data.message)
    }
    finally {
        setIsOpenForm(false)
        reFetchRoleList()
    }
}

export const CreateRoleForm: React.FC<CreateRoleFormProps> = ({
                                                              isOpenForm,
                                                              setIsOpenForm,
                                                              createHelper,
                                                              reFetchRoleList,
                                                              messageApi,
                                                          }) => {
    const [form] = Form.useForm()

    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }

    return (
        <Modal title="Create role form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as ICreateRoleRequest
                      const roleName = formVal.roleName

                      await handleSubmitForm(
                          createHelper,
                          setIsOpenForm,
                          {
                              roleName,
                          },
                          reFetchRoleList,
                          messageApi,
                      )
                  }}
            >
                <Form.Item
                    name="roleName"
                    label="Role name"
                    rules={[{required: true, message: 'Role name is required'}]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}