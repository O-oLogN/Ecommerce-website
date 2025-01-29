import {Modal, Form, Input, Select, Upload, message} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import React, {useState} from 'react'
import {ItemInfo, CategoryInfo} from 'types'
import {useCreateItem, useSearchCategory} from 'services'
import {HttpStatusCode} from 'axios'
import {ICreateItemRequest} from 'services/types'
const {Dragger} = Upload

interface CreateItemFormProps {
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    createHelper: ReturnType<typeof useCreateItem>
    reFetchItemList: () => void
    messageApi: typeof message
}

const handleSubmitForm = async (
    createHelper: ReturnType<typeof useCreateItem>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    createRequest: ICreateItemRequest,
    reFetchItemList: () => void,
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
                console.log('FORM - Item created successfully!')
                messageApi.success('Item created successfully!')
            }
            // else {
            //     console.log('FORM - Item created failed!')
            // }
        }
    }
    catch (error) {
        console.log('ERROR - item created failed!')
        const errObj = error as any
        messageApi.error(errObj.status + ' - '
            + errObj.code + ' - '
            + errObj.response.data.error + ' - '
            + errObj.response.data.message)
    }
    finally {
        setIsOpenForm(false)
        reFetchItemList()
    }
}

export const CreateItemForm: React.FC<CreateItemFormProps> = ({
                                                                  isOpenForm,
                                                                  setIsOpenForm,
                                                                  createHelper,
                                                                  reFetchItemList,
                                                                  messageApi,
                                                              }) => {
    const [form] = Form.useForm()
    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }
    const [categories, setCategories] = useState<CategoryInfo[] | undefined>([])
    const [categorySelected, setCategorySelected] = useState<CategoryInfo | undefined>()
    const [imagesUploaded, setImagesUploaded] = useState<File[] | undefined>()
    const searchCategoryResponse = useSearchCategory({
        sample: {
            categoryName: '',
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 100,
        },
        ordersBy: {

        }
    })
    React.useEffect(() => {
        if (!searchCategoryResponse.data) {
            console.log('searchCategoryResponse.data is undefined')
        }
        else if (searchCategoryResponse.data!.status === HttpStatusCode.Ok) {
            setCategories(searchCategoryResponse.data!.data.content)
            setCategorySelected(searchCategoryResponse.data!.data.content![0])
        }
    }, [searchCategoryResponse.data, searchCategoryResponse.isSuccess])

    React.useEffect(() => {
        if (categorySelected) {
            form.setFieldsValue({
                categoryCode: categorySelected.code || '',
            })
        }
    }, [categorySelected])

    return (
        <Modal title="Create item form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as ItemInfo
                      const categoryId =  categorySelected!.categoryId
                      const name = formVal.name
                      const price = formVal.price || null
                      const image = imagesUploaded && imagesUploaded.length > 0 ? imagesUploaded![0] : null
                      const quantity = formVal.quantity

                      await handleSubmitForm(
                          createHelper,
                          setIsOpenForm,
                          {
                              categoryId,
                              name,
                              price,
                              image,
                              quantity
                          },
                          reFetchItemList,
                          messageApi,
                      )
                  }}
            >
                <Form.Item
                    name="categoryId"
                    label="Category name"
                    initialValue={{
                        value: categories && categories.length > 0 ? categories[0].name : '',
                        label: categories && categories.length > 0 ? categories[0].name : '',
                    }}
                >
                    {categories && categories.length > 0
                        ? <Select
                            style={{
                                width: 120,
                            }}
                            onChange={value => {
                                setCategorySelected(categories.find(category => category.name === value))}
                            }
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
                    name="categoryCode"
                    label="Category code"
                    initialValue={categorySelected ? categorySelected.code : ''}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Item name"
                    rules={[
                        {required: true, message: 'Item name is required'},
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Item price"
                    rules={[
                        {
                            validator: (_, value) => {
                                console.log(value)
                                if (value < 0) {
                                    return Promise.reject(new Error('Price cannot be less than 0'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input
                        type="number"
                    />
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
                    name="quantity"
                    label="Quantity"
                    rules={[
                        {required: true, message: 'Quantity is required'},
                        {
                            validator: (_, value) => {
                                console.log(value)
                                if (value < 0) {
                                    return Promise.reject(new Error('Quantity cannot be less than 0'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input type="number"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}