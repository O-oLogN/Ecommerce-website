import {Modal, Form, Input, Select, Upload, message, Tag} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import React, {useState} from 'react'
import {ItemInfo, CategoryInfo, HighlightInfo, BadgeInfo} from 'types'
import {useCreateItem, useSearchBadge, useSearchCategory, useSearchHighlight} from 'services'
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
    const [highlights, setHighlights] = useState<HighlightInfo[]>([])
    const [badges, setBadges] = useState<BadgeInfo[]>([])
    const [unusedHighlights, setUnusedHighlights] = useState<HighlightInfo[]>([])
    const [unusedBadges, setUnusedBadges] = useState<BadgeInfo[]>([])
    const onCloseHighlightTag = (highlightId: string) => {
        setUnusedHighlights([...unusedHighlights, highlights.find(highlight => highlight.highlightId === highlightId)!])
    }
    const onCloseBadgeTag = (badgeId: string) => {
        setUnusedBadges([...unusedBadges, badges.find(badge => badge.badgeId === badgeId)!])
    }
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
    const searchHighlightResponse = useSearchHighlight({
        sample: "",
        pageInfo: {
            pageNumber: 0,
            pageSize: 100
        },
        ordersBy: {

        }
    })
    const searchBadgeResponse = useSearchBadge({
        sample: "",
        pageInfo: {
            pageNumber: 0,
            pageSize: 100
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

    React.useEffect(() => {
        if (searchHighlightResponse.data?.data) {
            const highlights = searchHighlightResponse.data.data.content!
            setHighlights(highlights)
            setUnusedHighlights(highlights)
        }
    }, [searchHighlightResponse.data])

    React.useEffect(() => {
        if (searchBadgeResponse.data?.data) {
            const badges = searchBadgeResponse.data.data.content!
            setBadges(badges)
            setUnusedBadges(badges)
        }
    }, [searchBadgeResponse.data])

    return (
        <Modal title="Create item form" open={isOpenForm} onOk={form.submit} onCancel={handleCancel}>
            <Form form={form}
                  onFinish={async() => {
                      const formVal = await form.validateFields() as ItemInfo
                      const name = formVal.name
                      const categoryId =  categorySelected!.categoryId
                      const quantity = formVal.quantity
                      const image = imagesUploaded && imagesUploaded.length > 0 ? imagesUploaded![0] : null
                      let usedBadgeIds: string[] = []
                      badges.forEach(badge => {
                          if (!unusedBadges.includes(badge)) {
                              usedBadgeIds.push(badge.badgeId)
                          }
                      })
                      let usedHighlightIds: string[] = []
                      highlights.forEach(highlight => {
                          if (!unusedHighlights.includes(highlight)) {
                              usedHighlightIds.push(highlight.highlightId)
                          }
                      })
                      const price = formVal.price || null
                      const numberOfReviews = formVal.numberOfReviews
                      const rate = formVal.rate

                      await handleSubmitForm(
                          createHelper,
                          setIsOpenForm,
                          {
                              categoryId,
                              name,
                              price,
                              image,
                              quantity,
                              highlightIds: usedHighlightIds,
                              badgeIds: usedBadgeIds,
                              numberOfReviews,
                              rate,
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
                <Form.Item
                    label="Highlights"
                >
                    <Select
                        defaultValue="--Highlights--"
                        onChange={value => {
                            let newUnusedHighlights = [...unusedHighlights]
                            newUnusedHighlights.splice(newUnusedHighlights.findIndex(highlight => highlight.highlightId === value), 1)
                            setUnusedHighlights(newUnusedHighlights)
                        }}
                        options={unusedHighlights.map(highlight => ({
                            value: highlight.highlightId,
                            label: highlight.content
                        }))}
                    />
                    <div style={{width: 400, height: 200, border: "white 1px solid"}}>
                        { highlights.map(highlight => {
                            const index = unusedHighlights.find(unusedHighlight => unusedHighlight.highlightId === highlight.highlightId)
                            if (!index) {
                                return (
                                    <Tag bordered={true} color="cyan" closable={true} onClose={() => onCloseHighlightTag(highlight.highlightId)}>
                                        {highlight.content}
                                    </Tag>
                                )
                            }
                            return null
                        }) }
                    </div>
                </Form.Item>
                <Form.Item
                    label="Badges"
                >
                    <Select
                        defaultValue="--Badges--"
                        onChange={value => {
                            let newUnusedBadges = [...unusedBadges]
                            newUnusedBadges.splice(newUnusedBadges.findIndex(badge => badge.badgeId === value), 1)
                            setUnusedBadges(newUnusedBadges)
                        }}
                        options={unusedBadges.map(badge => ({
                            value: badge.badgeId,
                            label: badge.description
                        }))}
                    />
                    <div style={{width: 400, height: 200, border: "white 1px solid"}}>
                        { badges.map(badge => {
                            const index = unusedBadges.find(unusedBadge => badge.badgeId === unusedBadge.badgeId)
                            if (!index) {
                                return (
                                    <Tag bordered={true} color="magenta" closable={true} onClose={() => onCloseBadgeTag(badge.badgeId)}>
                                        <img src={badge.iconMinioGetUrl ?? '#'} alt="" style={{width: 15, height: 15, marginRight: 5, marginTop: 2}}  />
                                        <span>{badge.description}</span>
                                    </Tag>
                                )
                            }
                            return null
                        }) }
                    </div>
                </Form.Item>
                <Form.Item
                    name="numberOfReviews"
                    rules={[{required: true}]}
                    label="Number of reviews"
                >
                    <Input type="number"/>
                </Form.Item>
                <Form.Item
                    name="rate"
                    label="Rate"
                >
                    <Input type="number"/>
                </Form.Item>
            </Form>
        </Modal>
    )
}