import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { CategoryInfo } from 'src/types'
import { useCategoryManagementContext } from '../../hooks/CategoryManagementContext.tsx'
import { useMessageContext } from '../../../../components'
import React, { useState, useEffect } from 'react'
import { SearchBar } from '../SearchBar'
import { EditCategoryForm } from '../modal/EditCategoryForm.tsx'
import { CreateCategoryForm } from '../modal/CreateCategoryForm.tsx'
import {HttpStatusCode} from 'axios'

interface TableData extends CategoryInfo {
    key: string
}

interface TableColumn {
    title: string
    dataIndex?: string
    key: string
    render?: (text: any, record: CategoryInfo, index: number) => React.ReactNode
    sorter?: (a: any, b: any) => number
    defaultSortOrder?: 'ascend' | 'descend'
}

const sortFunctions: Function[] = [
    (a: string | null, b: string | null) =>
        a && b ? a.localeCompare(b)
            : (a && !b ? 1 : (!a && b ? -1 : 0)),
]

export const CategoryList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([])
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false)
    const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false)
    const [modalFormInitialValues, setModalFormInitialValues] = useState<CategoryInfo | undefined>()
    const [data, setData] = useState<TableData[]>([])
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [searchBarValue, setSearchBarValue] = useState<string>('')
    const {
        searchResponse,
        categoryList,
        totalElements,
        searchRequest: prevSearchRequest,
        setSearchRequest,
        editHelper,
        deleteHelper,
        createHelper,
        refetchCategoryList,
    } = useCategoryManagementContext()
    const {messageApi} = useMessageContext()
    const columnNames = ['Category code', 'Category name', 'Create user', 'Create date time', 'Modify user', 'Modify date time']
    
    const onClickSearchBtn = () => {
        const searchBar = document.getElementById('category-search-bar') as HTMLInputElement
        setSearchBarValue(searchBar.value)
        setSearchRequest({
            ...prevSearchRequest,
            sample: {
                 categoryName: searchBar?.value || ''
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
    
    const handleOpenEditForm = (row: CategoryInfo) => {
        setModalFormInitialValues(row)
        setIsOpenEditForm(true)
    }

    const handleDelete = async (row: CategoryInfo) => {
        const deleteRequest = {
            categoryId: row.categoryId
        }
        const deleteResponse = await deleteHelper.mutateAsync(deleteRequest)
        if (!deleteResponse) {
            console.log('deleteResponse is undefined')
        }
        else if (!deleteResponse.data) {
            console.log('deleteResponse.data is undefined')
        }
        else {
            if (deleteResponse.data.status === HttpStatusCode.Ok) {
                console.log('INDEX - Category deleted successfully!')
            }
            else {
                console.log('INDEX - Category deleted failed!')
            }
        }
        
        refetchCategoryList()
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
                categoryName: searchBarValue || ''
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
        setData(
            (categoryList || []).map((category, index) => ({
                key: index.toString(),
                ...category,
            }))
        )

        if (categoryList && categoryList.length > 0) {
            const objectKeys = Object.keys(categoryList[0]).slice(1)
            const categoryColumns: TableColumn[] = objectKeys.map((key, index) => ({
                title: columnNames[index],
                dataIndex: key,
                key: index.toString(),
                sorter: (a, b) => sortFunctions[0](a[key], b[key]),
                defaultSortOrder: 'ascend'
            }))

            categoryColumns.push({
                title: 'Actions',
                key: 'actions',
                render: (record: CategoryInfo) => (
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
            });

            setColumns(categoryColumns);
        }
    }, [categoryList]);

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
            <EditCategoryForm initialValues={modalFormInitialValues}
                          isOpenForm={isOpenEditForm}
                          setIsOpenForm={setIsOpenEditForm}
                          editHelper={editHelper}
                          refetchCategoryList={refetchCategoryList}
                          
            />
            <CreateCategoryForm isOpenForm={isOpenCreateForm}
                              setIsOpenForm={setIsOpenCreateForm}
                              createHelper={createHelper}
                              refetchCategoryList={refetchCategoryList}
            />
        </>
    )
}
