import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useItemManagementContext } from '../../hooks/ItemManagementContext.tsx'
import { useMessageContext } from 'components'
import React, { useState, useEffect } from 'react'
import { SearchBar } from '../SearchBar'
import { EditItemForm } from '../modal/EditItemForm.tsx'
import { CreateItemForm } from '../modal/CreateItemForm.tsx'
import { HttpStatusCode } from 'axios'
import { TableData } from '../types'

interface TableColumn {
    title: string
    dataIndex?: string
    key: string
    render?: (text: any, record: TableData, index: number) => React.ReactNode
    sorter?: (a: any, b: any) => number
    defaultSortOrder?: 'ascend' | 'descend'
}

const sortFunctions: Function[] = [
    (a: string | null, b: string | null) => {
        return a && b ? a.localeCompare(b)
            : (a && !b ? 1 : (!a && b ? -1 : 0))
    },

    (a: number, b: number) => {
        return a - b
    }
]

export const ItemList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([])
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false)
    const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false)
    const [modalFormInitialValues, setModalFormInitialValues] = useState<TableData | undefined>()
    const [data, setData] = useState<TableData[]>([])
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [searchBarValue, setSearchBarValue] = useState<string>('')
    const {
        searchResponse,
        itemList,
        totalElements,
        searchRequest: prevSearchRequest,
        setSearchRequest,
        editHelper,
        deleteHelper,
        createHelper,
        searchCategoryHelper,
        reFetchItemList,
    } = useItemManagementContext()
    const {messageApi} = useMessageContext()
    const columnNames = ['Item name', 'Category code', 'Category name', 'Item price ($)', 'Image', 'Quantity', 'Create user', 'Create date time', 'Modify user', 'Modify date time']
    const columnDataIndexes = ['name', 'categoryCode', 'categoryName', 'price', 'imageUrl', 'quantity', 'createUser', 'createDatetime', 'modifyUser', 'modifyDatetime']

    const onClickSearchBtn = () => {
        const searchBar = document.getElementById('item-search-bar') as HTMLInputElement
        setSearchBarValue(searchBar.value)
        setSearchRequest({
            ...prevSearchRequest,
            sample: {
                itemName: searchBar?.value || ''
            },
            pageInfo: {
                pageNumber: 0,
                pageSize: 10
            },
            ordersBy: {

            }
        })
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickSearchBtn()
        }
    }

    const handleOpenEditForm = (row: TableData) => {
        setModalFormInitialValues(row)
        setIsOpenEditForm(true)
    }

    const handleDelete = async (row: TableData) => {
        const deleteRequest = {
            itemId: row.itemId
        }
        try {
            const deleteResponse = await deleteHelper.mutateAsync(deleteRequest)
            if (!deleteResponse) {
                console.log('deleteResponse is undefined')
            } else if (!deleteResponse.data) {
                console.log('deleteResponse.data is undefined')
            }
            else {
                if (deleteResponse.data.status === HttpStatusCode.Ok) {
                    console.log('INDEX - Item deleted successfully!')
                    messageApi.success('Item deleted successfully!')
                }
                // else {
                //     console.log('INDEX - Item deleted failed!')
                // }
            }
        }
        catch (error) {
            console.log('ERROR - item deleted failed!')
            const errObj = error as any
            messageApi.error(errObj.status + ' - '
                + errObj.code + ' - '
                + errObj.response.data.error + ' - '
                + errObj.response.data.message)
        }
        finally {
            reFetchItemList()
        }
    }

    const handleCreate = () => {
        setIsOpenCreateForm(true)
    }

    const handleTableChange = (pagination: any) => {
        setPageNumber(pagination.current - 1)
        setPageSize(pagination.pageSize)
        setSearchRequest({
            ...prevSearchRequest,
            sample: {
                itemName: searchBarValue || ''
            },
            pageInfo: {
                pageNumber: pagination.current - 1,
                pageSize: pagination.pageSize
            },
            ordersBy: {

            }
        })
    }

    const addBtnStyle = {
        width: '100px',
        marginLeft: '90%',
        marginBottom: '10px'
    }

    useEffect(() => {
        const setUpData = async() => {
            const categoryPromises = itemList!.map(async (item) => {
                const searchCategoryResponse = await searchCategoryHelper.mutateAsync({
                    categoryId: item.categoryId
                })
                return searchCategoryResponse.data
            })
            const resolvedCategories =  await Promise.all(categoryPromises)

            const updatedData = itemList!.map((item, index) => {
                return {
                    key: index.toString(),
                    categoryName: resolvedCategories[index]?.name,
                    categoryCode: resolvedCategories[index]?.code,
                    itemId: item.itemId,
                    categoryId: item.categoryId,
                    name: item.name,
                    price: item.price,
                    imageMinioGetUrl: item.imageMinioGetUrl,
                    imageMinioPutUrl: item.imageMinioPutUrl,
                    quantity: item.quantity,
                    createUser: item.createUser,
                    createDatetime: item.createDatetime,
                    modifyUser: item.modifyUser,
                    modifyDatetime: item.modifyDatetime,
                } as TableData
            })

            if (updatedData && updatedData.length > 0) {
                const tableColumns: TableColumn[] = [
                    ...(columnNames.map((columnName, index) => ({
                        title: columnName,
                        dataIndex: columnDataIndexes[index],
                        key: index.toString(),
                        sorter: (a: any, b: any) => {
                            const type = typeof a[columnDataIndexes[index]]
                            if (type === null) {
                                return 0
                            }
                            const valueA = a[columnDataIndexes[index]]
                            const valueB = b[columnDataIndexes[index]]
                            return type === 'string' ? sortFunctions[0](valueA, valueB)
                                : sortFunctions[1](valueA, valueB)
                        }
                    })))
                ]

                tableColumns[tableColumns.findIndex(col => col.dataIndex === 'imageUrl')]
                    = {
                    title: 'Image',
                    dataIndex: '',
                    key: tableColumns.findIndex(col => col.dataIndex === 'image').toString(),
                    render: (record: TableData) => {
                        if (record.imageMinioGetUrl)
                            return <img src={record.imageMinioGetUrl} style={{width: '100px', height: 'auto'}} alt={''}/>
                        return <></>
                    }
                }

                tableColumns.push({
                    title: 'Actions',
                    key: 'actions',
                    render: (record: TableData) => (
                        <Space>
                            <Button type="link" onClick={() => handleOpenEditForm(record)}>
                                <EditOutlined>
                                    Edit
                                </EditOutlined>
                            </Button>
                            <Button type="link" danger onClick={() => handleDelete(record)}>
                                <DeleteOutlined>
                                    Delete
                                </DeleteOutlined>
                            </Button>
                        </Space>
                    ),
                })

                setData(updatedData)
                setColumns(tableColumns)
            }
        }
        setUpData().then(() => {})
    }, [itemList])

    return (
        <>
            <SearchBar onClick={onClickSearchBtn} onKeyDown={onKeyDown} />
            <Button type="primary"
                    style={addBtnStyle}
                    onClick={handleCreate}
            >
                Add
            </Button>
            <Table
                dataSource={data}
                columns={columns}
                pagination={{
                    current: pageNumber + 1, // pageNumber page
                    pageSize: pageSize, // Items per page
                    total: totalElements, // Total number of items
                    showSizeChanger: true, // Allow changing page size
                    pageSizeOptions: ['2', '5', '10', '20', '50'], // Options for page size
                    showQuickJumper: true, // Allow jumping to a specific page
                    showTotal: (total, range) => (
                        <div style={{ float: 'right' }}>
                            <span>{`Showing ${range[0]}-${range[1]} of ${total} items`}</span>
                        </div>
                    ),
                }}
                onChange={handleTableChange}
                loading={searchResponse!.isLoading || searchResponse!.isRefetching}
            />
            <EditItemForm initialValue={modalFormInitialValues}
                          isOpenForm={isOpenEditForm}
                          setIsOpenForm={setIsOpenEditForm}
                          editHelper={editHelper}
                          reFetchItemList={reFetchItemList}
                          messageApi={messageApi}
            />
            <CreateItemForm isOpenForm={isOpenCreateForm}
                            setIsOpenForm={setIsOpenCreateForm}
                            createHelper={createHelper}
                            reFetchItemList={reFetchItemList}
                            messageApi={messageApi}
            />
        </>
    )
}