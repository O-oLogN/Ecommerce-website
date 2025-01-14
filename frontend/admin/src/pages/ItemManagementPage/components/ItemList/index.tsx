import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ItemInfo } from 'src/types'
import { useItemManagementContext } from '../../hooks/ItemManagementContext.tsx'
import React, { useState, useEffect } from 'react'
import { SearchBar } from '../SearchBar'
import { EditItemForm } from '../modal/EditItemForm.tsx'
import { CreateItemForm } from '../modal/CreateItemForm.tsx'
import { HttpStatusCode } from 'axios'

interface TableData extends ItemInfo {
    key: string
}

interface TableColumn {
    title: string
    dataIndex?: string
    key: string
    render?: (text: any, record: ItemInfo, index: number) => React.ReactNode
}

export const ItemList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([])
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false)
    const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false)
    const [modalFormInitialValues, setModalFormInitialValues] = useState<ItemInfo | undefined>()
    const [data, setData] = useState<TableData[]>([])
    const {
        itemList,
        searchRequest: prevSearchRequest,
        setSearchRequest,
        editHelper,
        deleteHelper,
        createHelper,
        refetchItemList,
    } = useItemManagementContext()
    const columnNames = ['Item ID', 'Item code', 'Item name', 'Item price', 'Image URL', 'Quantity', 'Create user', 'Create date time', 'Modify user', 'Modify date time']
    
    const onClickSearchBtn = () => {
        const searchBar = document.getElementById('item-search-bar') as HTMLInputElement
        setSearchRequest({
            ...prevSearchRequest,
            sample: {
                 itemName: searchBar?.value || ''
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
    
    const handleOpenEditForm = (row: ItemInfo) => {
        setModalFormInitialValues(row)
        setIsOpenEditForm(true)
    }

    const handleDelete = async (row: ItemInfo) => {
        const deleteRequest = {
            itemId: row.itemId
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
                console.log('INDEX - Item deleted successfully!')
            }
            else {
                console.log('INDEX - Item deleted failed!')
            }
        }
        
        refetchItemList()
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
            (itemList || []).map((item, index) => ({
                key: index.toString(),
                ...item,
            }))
        )

        if (itemList && itemList.length > 0) {
            const itemColumns: TableColumn[] = Object.keys(itemList[0]).map((key, index) => ({
                title: columnNames[index],
                dataIndex: key,
                key: index.toString(),
            }))

            itemColumns.push({
                title: 'Actions',
                key: 'actions',
                render: (record: ItemInfo) => (
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

            setColumns(itemColumns);
        }
    }, [itemList]);

    return (
        <>
            <SearchBar onClick={onClickSearchBtn} onKeyDown={onKeyDown} />
            <Table dataSource={data} columns={columns} />
            <EditItemForm initialValues={modalFormInitialValues}
                          isOpenForm={isOpenEditForm}
                          setIsOpenForm={setIsOpenEditForm}
                          editHelper={editHelper}
                          refetchItemList={refetchItemList}
            />
            <CreateItemForm isOpenForm={isOpenCreateForm}
                          setIsOpenForm={setIsOpenCreateForm}
                          createHelper={createHelper}
                          refetchItemList={refetchItemList}
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
