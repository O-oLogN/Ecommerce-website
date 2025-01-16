import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { UserInfo } from 'src/types'
import { useUserManagementContext } from '../../hooks/UserManagementContext.tsx'
import React, { useState, useEffect } from 'react'
import { SearchBar } from '../SearchBar'
import { EditUserForm } from '../modal/EditUserForm.tsx'
import { CreateUserForm } from '../modal/CreateUserForm.tsx'
import { HttpStatusCode } from 'axios'

interface TableData extends UserInfo {
    key: string
}

interface TableColumn {
    title: string
    dataIndex?: string
    key: string
    render?: (text: any, record: UserInfo, index: number) => React.ReactNode
}

export const UserList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([])
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false)
    const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false)
    const [modalFormInitialValues, setModalFormInitialValues] = useState<UserInfo | undefined>()
    const [data, setData] = useState<TableData[]>([])
    const {
        userList,
        searchRequest: prevSearchRequest,
        setSearchRequest,
        editHelper,
        deleteHelper,
        createHelper,
        refetchUserList,
    } = useUserManagementContext()
    const columnNames = ['Username', 'Email', 'Create user', 'Create date time', 'Modify user', 'Modify date time']
    
    const onClickSearchBtn = () => {
        const searchBar = document.getElementById('user-search-bar') as HTMLInputElement
        setSearchRequest({
            ...prevSearchRequest,
            sample: {
                username: searchBar?.value || ''
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
    
    const handleOpenEditForm = (row: TableData) => {
        setModalFormInitialValues(row)
        setIsOpenEditForm(true)
    }

    const handleDelete = async (row: TableData) => {
        const deleteRequest = {
            userId: row.userId
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
                console.log('INDEX - user deleted successfully!')
            }
            else {
                console.log('INDEX - user deleted failed!')
            }
        }
        
        refetchUserList()
    }

    const handleCreate = () => {
        setIsOpenCreateForm(true)
    }

    const addBtnStyle = {
        width: '100px',
        marginLeft: '90%',
        marginBottom: '10px'
    }

    useEffect(() => {
        setData(
            (userList || []).map((user, index) => ({
                key: index.toString(),
                ...user,
            }))
        )

        if (userList && userList.length > 0) {
            let objectKeys = Object.keys(userList[0])
            objectKeys = objectKeys.slice(1, 2).concat(objectKeys.slice(3))
            const userColumns: TableColumn[] = objectKeys.map((key, index) => ({
                title: columnNames[index],
                dataIndex: key,
                key: index.toString(),
            }))

            userColumns.push({
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
            });

            setColumns(userColumns);
        }
    }, [userList]);

    return (
        <>
            <SearchBar onClick={onClickSearchBtn} onKeyDown={onKeyDown} />
            <Button type="primary"
                    style={addBtnStyle}
                    onClick={handleCreate}
            >
                Add
            </Button>
            <Table dataSource={data} columns={columns} />
            <EditUserForm initialValues={modalFormInitialValues}
                          isOpenForm={isOpenEditForm}
                          setIsOpenForm={setIsOpenEditForm}
                          editHelper={editHelper}
                          refetchUserList={refetchUserList}
            />
            <CreateUserForm isOpenForm={isOpenCreateForm}
                            setIsOpenForm={setIsOpenCreateForm}
                            createHelper={createHelper}
                            refetchUserList={refetchUserList}
            />
        </>
    )
};
