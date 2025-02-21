import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { UserInfo } from 'types'
import { useUserManagementContext } from '../../hooks/UserManagementContext.tsx'
import { useMessageContext } from 'components'
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
    sorter?: (a: any, b: any) => number
    defaultSortOrder?: 'ascend' | 'descend'
}

const sortFunctions: Function[] = [
    (a: string | null, b: string | null) =>
        a && b ? a.localeCompare(b)
                : (a && !b ? 1 : (!a && b ? -1 : 0)),
]

export const UserList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([])
    const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false)
    const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false)

    const [modalFormInitialValues, setModalFormInitialValues] = useState<UserInfo | undefined>()
    const [data, setData] = useState<TableData[]>([])
    const {
        searchResponse,
        userList,
        totalElements,
        searchRequest: prevSearchRequest,
        setSearchRequest,
        editHelper,
        deleteHelper,
        createHelper,
        reFetchUserList,
    } = useUserManagementContext()
    const {messageApi} = useMessageContext()
    const columnNames = ['Username', 'Email', 'Create user', 'Create date time', 'Modify user', 'Modify date time', 'Roles']
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [searchBarValue, setSearchBarValue] = useState<string>('')
    const onClickSearchBtn = () => {
        const searchBar = document.getElementById('user-search-bar') as HTMLInputElement

        setSearchBarValue(searchBar.value)
        setSearchRequest({
            ...prevSearchRequest,
            sample: {
                username: searchBar.value || '',
            },
            pageInfo: {
                pageNumber: pageNumber,
                pageSize: pageSize
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
            userId: row.userId
        }
        try {
            const deleteResponse = await deleteHelper.mutateAsync(deleteRequest)
            if (!deleteResponse) {
                console.log('deleteResponse is undefined')
            } else if (!deleteResponse.data) {
                console.log('deleteResponse.data is undefined')
            } else {
                if (deleteResponse.data.status === HttpStatusCode.Ok) {
                    console.log('INDEX - user deleted successfully!')
                    messageApi.success('User deleted successfully!')
                }
                // else {
                //     console.log('INDEX - user deleted failed!')
                // }
            }
        }
        catch (error) {
            console.log('ERROR - user deleted failed!')
            const errObj = error as any
            messageApi.error(errObj.status + ' - '
                + errObj.code + ' - '
                + errObj.response.data.error + ' - '
                + errObj.response.data.message)
        }
        finally {
            reFetchUserList()
        }
    }

    const handleCreate = () => {
        setIsOpenCreateForm(!!1)
    }

    const handleTableChange = (pagination: any) => {
        setPageNumber(pagination.current - 1)
        setPageSize(pagination.pageSize)
        setSearchRequest({
            ...prevSearchRequest,
            sample: {
                username: searchBarValue || ''
            },
            pageInfo: {
                pageNumber: pagination.current - 1,
                pageSize: pagination.pageSize,
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
        const convertRolesArrToStr = (roles: string[]) => {
            let rolesStr = ''
            roles.map((role, index) => rolesStr += (!index ? '' : ', ') + `${role}`)
            return rolesStr
        }
        setData(
            (userList || []).map((user, index) => Object.assign({
                key: index.toString(),
                ...user,
            },
            {
                roles: convertRolesArrToStr(user.roles ?? []),
            }))
        )

        if (userList && userList.length > 0) {
            let objectKeys = Object.keys(userList[0])
            objectKeys = objectKeys.slice(1, 2).concat(objectKeys.slice(3))
            const userColumns: TableColumn[] = objectKeys.map((key, index) => ({
                title: columnNames[index],
                dataIndex: key,
                key: index.toString(),
                sorter: (a, b) => sortFunctions[0](a[key], b[key]),
                defaultSortOrder: 'ascend'
            }))

            userColumns.push({
                title: 'Actions',
                key: 'actions',
                render: (record: TableData) => (
                    <Space>
                        <Button type="link" onClick={() => {
                            handleOpenEditForm(record)
                        }}>
                            <EditOutlined>
                                Edit
                            </EditOutlined>
                        </Button>
                        <Button type="link" danger onClick={() =>
                            handleDelete(record)
                        }
                        >
                            <DeleteOutlined>
                                Delete
                            </DeleteOutlined>
                        </Button>
                    </Space>
                ),
            });

            setColumns(userColumns)
        }
    }, [userList])

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
            >
            </Table>
            <EditUserForm initialValues={modalFormInitialValues}
                          isOpenForm={isOpenEditForm}
                          setIsOpenForm={setIsOpenEditForm}
                          editHelper={editHelper}
                          reFetchUserList={reFetchUserList}
                          messageApi={messageApi}
            >
            </EditUserForm>
            <CreateUserForm isOpenForm={isOpenCreateForm}
                            setIsOpenForm={setIsOpenCreateForm}
                            createHelper={createHelper}
                            reFetchUserList={reFetchUserList}
                            messageApi={messageApi}
            />
        </>
    )
}
