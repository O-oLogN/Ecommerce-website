import {Modal, Form, Input} from 'antd'
import React from 'react'
import {CategoryInfo} from 'src/types'
import {useEditCategory} from '../../../../services'
import {HttpStatusCode} from 'axios'
import {IEditCategoryRequest} from 'src/services/types'

interface EditCategoryFormProps {
    initialValues: CategoryInfo | undefined
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    editHelper: ReturnType<typeof useEditCategory>
    refetchCategoryList: () => void
}

const handleSubmitForm = async (
    editHelper: ReturnType<typeof useEditCategory>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    editRequest: IEditCategoryRequest,
    refetchCategoryList: () => void,
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
            console.log('FORM - category edited successfully!')
        }
        else {
            console.log('FORM - category edited failed!')
        }
    }
    setIsOpenForm(false)
    refetchCategoryList()
}

export const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
  initialValues,
  isOpenForm,
  setIsOpenForm,
  editHelper,
  refetchCategoryList,
}) => {
    const [form] = Form.useForm()
    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }
    return (
        <Modal title="Update category form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as CategoryInfo
                      const categoryId = initialValues!.categoryId
                      const code = formVal.code || null
                      const name= formVal.name
                      
                      handleSubmitForm(
                          editHelper,
                          setIsOpenForm,
                          {
                              categoryId,
                              code,
                              name,
                          },
                          refetchCategoryList,
                      )
                  }}
                  initialValues={initialValues}
            >
                <Form.Item
                    name="code"
                    label="Category code"
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Category name"
                    rules={[{required: true, message: 'Category name is required'}]}
                >
                    <Input/>
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