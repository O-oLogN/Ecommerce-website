import {Modal, Form, Input, Upload, Select, message, FormInstance} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import React, {useState} from 'react'
import {ItemInfo, CategoryInfo} from 'types'
import {useEditItem, useSearchCategory} from 'services'
import {HttpStatusCode} from 'axios'
import {IEditItemRequest} from 'services/types'
import {TableData} from '../types'
const {Dragger} = Upload

interface EditItemFormProps {
    initialValue: TableData | undefined
    isOpenForm: boolean
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>
    editHelper: ReturnType<typeof useEditItem>
    reFetchItemList: () => void
    messageApi: typeof message
}

const handleSubmitForm = async (
    editHelper: ReturnType<typeof useEditItem>,
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
    editRequest: IEditItemRequest,
    reFetchItemList: () => void,
    messageApi: typeof message,
    form: FormInstance,
    setImagesUploaded: React.Dispatch<React.SetStateAction<File[] | undefined>>,
) => {
    try {
        const editResponse = await editHelper.mutateAsync(editRequest)
        if (!editResponse) {
            console.log('editResponse is undefined')
        } else if (!editResponse.data) {
            console.log('editResponse.data is undefined')
        } else {
            if (editResponse.data.status === HttpStatusCode.Ok) {
                console.log('FORM - Item updated successfully!')
                messageApi.success('Item updated successfully!')
            }
            // else {
            //     console.log('FORM - Item updated failed!')
            // }
        }
    }
    catch (error) {
        form.resetFields()
        setImagesUploaded([])
        console.log('ERROR - item updated failed!')
        const errObj = error as any
        messageApi.error(errObj.status + ' - '
            + errObj.code + ' - ')
    }
    finally {
        form.resetFields()
        setIsOpenForm(false)
        reFetchItemList()
    }
}

export const EditItemForm: React.FC<EditItemFormProps> = ({
                                                              initialValue,
                                                              isOpenForm,
                                                              setIsOpenForm,
                                                              editHelper,
                                                              reFetchItemList,
                                                              messageApi,
                                                          }) => {
    const [form] = Form.useForm()
    const [imagesUploaded, setImagesUploaded] = useState<File[] | undefined>()
    const [categorySelected, setCategorySelected] = useState<CategoryInfo | undefined>(undefined)
    const [categories, setCategories] = useState<CategoryInfo[] | undefined>([])
    
    const handleCancel = () => {
        form.resetFields()
        setIsOpenForm(false)
    }
    const searchCategoryResponse = useSearchCategory({
        sample: {
            categoryName: "",
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
            console.log('searchCategoryResponse.data is undefined!')
        }
        else if (searchCategoryResponse.data!.status === HttpStatusCode.Ok) {
            setCategories(searchCategoryResponse.data!.data.content)
            setCategorySelected(searchCategoryResponse.data!.data.content![0])
        }
    }, [searchCategoryResponse.data, searchCategoryResponse.isSuccess])

    React.useEffect(() => {
        setCategorySelected(categories && categories.length > 0 ? categories[0] : undefined)
    }, [categories])

    React.useEffect(() => {
        if (initialValue) {
            form.setFieldsValue(initialValue)
        }
    }, [initialValue, form, categories])

    React.useEffect(() => {
        if (categorySelected) {
            form.setFieldsValue({
                categoryCode: categorySelected.code || '',
            })
        }
    }, [categorySelected, form])

    return (
        <Modal title="Update item form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as ItemInfo
                      const itemId = initialValue?.itemId as string
                      const categoryId = categorySelected!.categoryId
                      const name = formVal.name
                      const price = formVal.price || null
                      const image = imagesUploaded && imagesUploaded.length > 0 ? imagesUploaded![0] : null
                      const quantity = formVal.quantity

                      await handleSubmitForm(
                          editHelper,
                          setIsOpenForm,
                          {
                              itemId,
                              categoryId,
                              name,
                              price,
                              image,
                              imageMinioGetUrl: initialValue!.imageMinioGetUrl,
                              imageMinioPutUrl: initialValue!.imageMinioPutUrl,
                              quantity
                          },
                          reFetchItemList,
                          messageApi,
                          form,
                          setImagesUploaded,
                      )
                  }}
            >
                <Form.Item
                    name="name"
                    label="Item name"
                    rules={[{required: true, message: 'Item name is required'}]}
                    initialValue={initialValue ? initialValue.name : ''}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="categoryName"
                    label="Category name"
                    initialValue = {{
                        value: categories && categories.length > 0 ? categories[0].name : '',
                        label: categories && categories.length > 0 ? categories[0].name : ''
                    }}
                >
                    {categories && categories.length > 0
                        ? <Select
                            style={{
                                width: 120,
                            }}
                            onChange={(value) => {
                                const categoryFound = categories.find(category =>
                                    category.name === value)
                                setCategorySelected(categoryFound!)
                            }}
                            options={categories.map((category) => ({
                                value: category.name,
                                label: category.name,
                            }))}
                        />
                        : <Select defaultValue={{
                            value: '',
                            label: ''
                        }}/>
                    }
                </Form.Item>
                <Form.Item
                    name="categoryCode"
                    label="Category code"
                    initialValue={initialValue ? initialValue.categoryCode : ''}
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Item price"
                    initialValue={initialValue ? initialValue.price : ''}
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
                                message.error(`${info.file.name} file upload failed!`).then(() => {})
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
                    initialValue={initialValue ? initialValue.quantity : ''}
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