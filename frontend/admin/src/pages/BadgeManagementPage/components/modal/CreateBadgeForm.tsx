import {Modal, Form, Input, message, Upload} from 'antd'
import React, {useState} from 'react'
import {useCreateBadge} from 'services'
import {HttpStatusCode} from 'axios'
import {ICreateBadgeRequest} from 'services/types'
import {UploadOutlined} from "@ant-design/icons"
const {Dragger} = Upload


interface CreateBadgeFormProps {
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    createHelper: ReturnType<typeof useCreateBadge>
    reFetchBadgeList: () => void
    messageApi: typeof message
}

const handleSubmitForm = async (
    createHelper: ReturnType<typeof useCreateBadge>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    createRequest: ICreateBadgeRequest,
    reFetchBadgeList: () => void,
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
                console.log('FORM - Badge created successfully!')
                messageApi.success('Badge created successfully!')
            }
        }
    }
    catch (error) {
        console.log('ERROR - Badge created failed!')
        const errObj = error as any
        messageApi.error(errObj.status + ' - '
            + errObj.code + ' - '
            + errObj.response.data.error + ' - '
            + errObj.response.data.message)
    }
    finally {
        setIsOpenForm(false)
        reFetchBadgeList()
    }
}

export const CreateBadgeForm: React.FC<CreateBadgeFormProps> = ({
                                                                  isOpenForm,
                                                                  setIsOpenForm,
                                                                  createHelper,
                                                                  reFetchBadgeList,
                                                                  messageApi,
                                                              }) => {
    const [form] = Form.useForm()
    const [imagesUploaded, setImagesUploaded] = useState<File[] | undefined>()

    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }

    return (
        <Modal title="Create badge form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as ICreateBadgeRequest
                      const description = formVal.description
                      const icon = imagesUploaded && imagesUploaded.length > 0 ? imagesUploaded![0] : null

                      await handleSubmitForm(
                          createHelper,
                          setIsOpenForm,
                          {
                              icon,
                              description,
                          },
                          reFetchBadgeList,
                          messageApi,
                      )
                  }}
            >
                <Form.Item
                    name="icon"
                    label="Icon"
                >
                    <Dragger
                        name="file"
                        accept="image/png, image/jpeg"
                        fileList={imagesUploaded as any}
                        onChange={(info: any) => {
                            const {status} = info.file
                            if (status === 'error') {
                                message.error(`${info.file.name} file upload failed.`).then(() => {})
                                return
                            }
                            setImagesUploaded([info.file])
                        }}
                        beforeUpload={() => false}  // Prevent automatic upload
                    >
                        <UploadOutlined style={{fontSize: '3em'}}/>
                        <p>Click or drag file to this area to upload</p>
                    </Dragger>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true, message: 'Badge description is required'}]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}