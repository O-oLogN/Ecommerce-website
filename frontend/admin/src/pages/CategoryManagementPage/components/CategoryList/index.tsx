import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { CategoryInfo } from 'src/types'
import { useCategoryManagementContext } from '../../hooks/CategoryManagementContext.tsx'
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
}

export const CategoryList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([])
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false)
    const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false)
    const [modalFormInitialValues, setModalFormInitialValues] = useState<CategoryInfo | undefined>()
    const [data, setData] = useState<TableData[]>([])
    const {
        categoryList,
        searchRequest: prevSearchRequest,
        setSearchRequest,
        editHelper,
        deleteHelper,
        createHelper,
        refetchCategoryList,
    } = useCategoryManagementContext()
    const columnNames = ['Category ID', 'Category code', 'Category name', 'Create user', 'Create date time', 'Modify user', 'Modify date time']
    
    const onClickSearchBtn = () => {
        const searchBar = document.getElementById('category-search-bar') as HTMLInputElement
        setSearchRequest({
            ...prevSearchRequest,
            sample: {
                 categoryName: searchBar?.value || ''
            },
            // pageInfo: {
            //     pageNumber: 0,
            //     pageSize: 10
            // },
            // ordersBy: {
            //
            // }
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

    const addBtnStyle = {
        width: '500px',
        marginLeft: '35%'
    }

    useEffect(() => {
        setData(
            (categoryList || []).map((category, index) => ({
                key: index.toString(),
                ...category,
            }))
        )

        if (categoryList && categoryList.length > 0) {
            const categoryColumns: TableColumn[] = Object.keys(categoryList[0]).map((key, index) => ({
                title: columnNames[index],
                dataIndex: key,
                key: index.toString(),
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
            <Table dataSource={data} columns={columns} />
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
            <Button type="primary"
                    style={addBtnStyle}
                    onClick={handleCreate}
            >
                Add
            </Button>
        </>
    )
};
