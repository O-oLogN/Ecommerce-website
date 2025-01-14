import {Modal, Form, Input} from 'antd'
import React from 'react'
import {ItemInfo} from 'src/types'
import {useEditItem} from '../../../../services'
import {HttpStatusCode} from 'axios'
import {IEditItemRequest} from 'src/services/types'

interface EditItemFormProps {
    initialValues: ItemInfo | undefined
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
    console.log(editRequest)
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
    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }
    return (
        <Modal title="Update Item form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as ItemInfo
                      const itemId = formVal.itemId
                      const categoryId = formVal.categoryId
                      const name = formVal.name
                      const price = formVal.price
                      const imageUrl = formVal.imageUrl
                      const quantity = formVal.quantity
                      
                      handleSubmitForm(
                          editHelper,
                          setIsOpenForm,
                          {
                              itemId,
                              categoryId,
                              name,
                              price,
                              imageUrl,
                              quantity
                          },
                          refetchItemList,
                      )
                  }}
                  initialValues={initialValues}
            >
                <Form.Item
                    name="itemId"
                    label="Item ID"
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="categoryId"
                    label="Category ID"
                >
                    <Input disabled />
                </Form.Item>
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
                    name="imageUrl"
                    label="Image URL"
                >
                    <Input/>
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