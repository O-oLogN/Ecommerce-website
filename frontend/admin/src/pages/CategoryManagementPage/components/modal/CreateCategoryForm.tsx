import {Modal, Form, Input} from 'antd'
import React from 'react'
import {CategoryInfo} from 'src/types'
import {useCreateCategory} from '../../../../services'
import {HttpStatusCode} from 'axios'
import {ICreateCategoryRequest} from 'src/services/types'

interface CreateCategoryFormProps {
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    createHelper: ReturnType<typeof useCreateCategory>
    refetchCategoryList: () => void
}

const handleSubmitForm = async (
    createHelper: ReturnType<typeof useCreateCategory>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    createRequest: ICreateCategoryRequest,
    refetchCategoryList: () => void,
) => {
    console.log(createRequest)
    const CreateResponse = await createHelper.mutateAsync(createRequest)
    if (!CreateResponse) {
        console.log('createResponse is undefined')
    }
    else if (!CreateResponse.data) {
        console.log('createResponse.data is undefined')
    }
    else {
        if (CreateResponse.data.status === HttpStatusCode.Ok) {
            console.log('FORM - category created successfully!')
        }
        else {
            console.log('FORM - category created failed!')
        }
    }
    setIsOpenForm(false)
    refetchCategoryList()
}

export const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
                                                                      isOpenForm,
                                                                      setIsOpenForm,
                                                                      createHelper,
                                                                      refetchCategoryList,
                                                                  }) => {
    const [form] = Form.useForm()
    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }
    return (
        <Modal title="Create category form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as CategoryInfo
                      const code = formVal.code
                      const name= formVal.name

                      handleSubmitForm(
                          createHelper,
                          setIsOpenForm,
                          {
                              code,
                              name,
                          },
                          refetchCategoryList,
                      )
                  }}
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
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    )
}