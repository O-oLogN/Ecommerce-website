import {Modal, Form, Input, Select} from 'antd'
import React, {useState} from 'react'
import {ItemInfo, CategoryInfo} from 'src/types'
import {useCreateItem, useSearchCategory} from '../../../../services'
import {HttpStatusCode} from 'axios'
import {ICreateItemRequest} from 'src/services/types'

interface CreateItemFormProps {
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    createHelper: ReturnType<typeof useCreateItem>
    refetchItemList: () => void
}

const handleSubmitForm = async (
    createHelper: ReturnType<typeof useCreateItem>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    createRequest: ICreateItemRequest,
    refetchItemList: () => void,
) => {
    const createResponse = await createHelper.mutateAsync(createRequest)
    if (!createResponse) {
        console.log('createResponse is undefined')
    }
    else if (!createResponse.data) {
        console.log('createResponse.data is undefined')
    }
    else {
        if (createResponse.data.status === HttpStatusCode.Ok) {
            console.log('FORM - Item created successfully!')
        }
        else {
            console.log('FORM - Item created failed!')
        }
    }
    setIsOpenForm(false)
    refetchItemList()
}

export const CreateItemForm: React.FC<CreateItemFormProps> = ({
                                                              isOpenForm,
                                                              setIsOpenForm,
                                                              createHelper,
                                                              refetchItemList,
                                                          }) => {
    const [form] = Form.useForm()
    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }
    const[categoryNameSelected, setCategoryNameSelected] = useState<string>('')
    const [categories, setCategories] = useState<CategoryInfo[] | undefined>([])
    const searchCategoryResponse = useSearchCategory({
        sample: {
            categoryName: '',
        }
    })
    React.useEffect(() => {
        if (searchCategoryResponse.data) {
            if ('content' in searchCategoryResponse.data) {
                setCategories(searchCategoryResponse.data.content.data.categories)
            } else {
                setCategories(searchCategoryResponse.data.data.categories)
            }
        }
    }, [searchCategoryResponse.data, searchCategoryResponse.isSuccess])
    return (
        <Modal title="Create item form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as ItemInfo
                      const categoryId =  categories![categories!.findIndex(category => category.name === categoryNameSelected)].categoryId
                      console.log(categoryId)
                      const name = formVal.name
                      const price = formVal.price
                      const imageUrl = formVal.imageUrl
                      const quantity = formVal.quantity

                      handleSubmitForm(
                          createHelper,
                          setIsOpenForm,
                          {
                              categoryId,
                              name,
                              price,
                              imageUrl,
                              quantity
                          },
                          refetchItemList,
                      )
                  }}
            >
                <Form.Item
                    name="categoryId"
                    label="Category ID"
                >
                    {categories && categories.length > 0
                    ? <Select
                            labelInValue
                            defaultValue={{
                                value: categories[0].name,
                                label: categories[0].name,
                            }}
                            style={{
                                width: 120,
                            }}
                            onChange={(value) => {setCategoryNameSelected(value.value)}}
                            options={categories.map((category) => ({
                                value: category.name,
                                label: category.name,
                            }))}
                        />
                    : <Select
                            labelInValue
                            defaultValue={{
                                value: '',
                                label: '',
                            }}
                            style={{
                                width: 120,
                            }}
                        />

                    }
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
            </Form>
        </Modal>
    )
}