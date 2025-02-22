import {Modal, Form, Input, message} from 'antd'
import React from 'react'
import {useCreateHighlight} from 'services'
import {HttpStatusCode} from 'axios'
import {ICreateHighlightRequest} from 'services/types'

interface CreateHighlightFormProps {
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    createHelper: ReturnType<typeof useCreateHighlight>
    reFetchHighlightList: () => void
    messageApi: typeof message
}

const handleSubmitForm = async (
    createHelper: ReturnType<typeof useCreateHighlight>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    createRequest: ICreateHighlightRequest,
    reFetchHighlightList: () => void,
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
                console.log('FORM - Highlight created successfully!')
                messageApi.success('Highlight created successfully!')
            }
        }
    }
    catch (error) {
        console.log('ERROR - Highlight created failed!')
        const errObj = error as any
        messageApi.error(errObj.status + ' - '
            + errObj.code + ' - '
            + errObj.response.data.error + ' - '
            + errObj.response.data.message)
    }
    finally {
        setIsOpenForm(false)
        reFetchHighlightList()
    }
}

export const CreateHighlightForm: React.FC<CreateHighlightFormProps> = ({
                                                                  isOpenForm,
                                                                  setIsOpenForm,
                                                                  createHelper,
                                                                  reFetchHighlightList,
                                                                  messageApi,
                                                              }) => {
    const [form] = Form.useForm()

    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }

    return (
        <Modal title="Create highlight form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as ICreateHighlightRequest
                      const content = formVal.content

                      await handleSubmitForm(
                          createHelper,
                          setIsOpenForm,
                          {
                              content,
                          },
                          reFetchHighlightList,
                          messageApi,
                      )
                  }}
            >
                <Form.Item
                    name="content"
                    label="Content"
                    rules={[{required: true, message: 'Highlight content is required'}]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}