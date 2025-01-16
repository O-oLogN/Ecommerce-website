import {Modal, Form, Input, Upload, message} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import React, {useState} from 'react'
import {ItemInfo} from 'src/types'
import {useEditItem} from 'src/services'
import {HttpStatusCode} from 'axios'
import {IEditItemRequest} from 'src/services/types'
import {TableData} from '../types'
const {Dragger} = Upload

interface EditItemFormProps {
    initialValues: TableData | undefined
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    editHelper: ReturnType<typeof useEditItem>
    refetchItemList: () => void
}

const handleSubmitForm = async (
    editHelper: ReturnType<typeof useEditItem>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    editRequest: IEditItemRequest,
    refetchItemList: () => void,
) => {
    const editResponse = await editHelper.mutateAsync(editRequest)
    if (!editResponse) {
        console.log('editResponse is undefined')
    }
    else if (!editResponse.data) {
        console.log('editResponse.data is undefined')
    }
    else {
        if (editResponse.data.status === HttpStatusCode.Ok) {
            console.log('FORM - Item edited successfully!')
        }
        else {
            console.log('FORM - Item edited failed!')
        }
    }
    setIsOpenForm(false)
    refetchItemList()
}

export const EditItemForm: React.FC<EditItemFormProps> = ({
  initialValues,
  isOpenForm,
  setIsOpenForm,
  editHelper,
  refetchItemList,
}) => {
    const [form] = Form.useForm()
    const [imagesUploaded, setImagesUploaded] = useState<File[] | undefined>()
    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }
    return (
        <Modal title="Update item form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as ItemInfo
                      const itemId = initialValues?.itemId as string
                      const categoryId = initialValues?.categoryId as string
                      const name = formVal.name
                      const price = formVal.price
                      const image = imagesUploaded![0]
                      const quantity = formVal.quantity
                      
                      handleSubmitForm(
                          editHelper,
                          setIsOpenForm,
                          {
                              itemId,
                              categoryId,
                              name,
                              price,
                              image,
                              quantity
                          },
                          refetchItemList,
                      )
                  }}
                  initialValues={initialValues}
            >
                <Form.Item
                    name="name"
                    label="Item name"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Item price"
                >
                    <Input type="number"/>
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image"
                >
                    <Dragger
                        name="file"
                        accept="image/png"
                        fileList={imagesUploaded as any}
                        onChange={(info: any) => {
                            const {status} = info.file
                            if (status === 'error') {
                                message.error(`${info.file.name} file upload failed.`)
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
                    name="quantity"
                    label="Quantity"
                >
                    <Input type="number"/>
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