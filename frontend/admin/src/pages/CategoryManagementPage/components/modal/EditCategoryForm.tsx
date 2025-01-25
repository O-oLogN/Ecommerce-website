import {Modal, Form, Input, message} from 'antd'
import React from 'react'
import {CategoryInfo} from 'types'
import {useEditCategory} from 'services'
import {HttpStatusCode} from 'axios'
import {IEditCategoryRequest} from 'services/types'

interface EditCategoryFormProps {
    initialValues: CategoryInfo | undefined
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    editHelper: ReturnType<typeof useEditCategory>
    reFetchCategoryList: () => void
    messageApi: typeof message
}

const handleSubmitForm = async (
    editHelper: ReturnType<typeof useEditCategory>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    editRequest: IEditCategoryRequest,
    reFetchCategoryList: () => void,
    messageApi: typeof message,
) => {
    try {
        const editResponse = await editHelper.mutateAsync(editRequest)
        if (!editResponse) {
            console.log('editResponse is undefined')
        } else if (!editResponse.data) {
            console.log('editResponse.data is undefined')
        } else {
            if (editResponse.data.status === HttpStatusCode.Ok) {
                console.log('FORM - category updated successfully!')
                messageApi.success('Item updated successfully!')
            }
            // else {
            //     console.log('FORM - category updated failed!')
            // }
        }
    }
    catch (error) {
        console.log('ERROR - category updated failed!')
        const errObj = error as any
        messageApi.error(errObj.status + ' - '
            + errObj.code + ' - '
            + errObj.response.data.error + ' - '
            + errObj.response.data.message)
    }
    finally {
        setIsOpenForm(false)
        reFetchCategoryList()
    }
}

export const EditCategoryForm: React.FC<EditCategoryFormProps> = ({
  initialValues,
  isOpenForm,
  setIsOpenForm,
  editHelper,
  reFetchCategoryList, 
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
                          reFetchCategoryList,
                          messageApi,
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