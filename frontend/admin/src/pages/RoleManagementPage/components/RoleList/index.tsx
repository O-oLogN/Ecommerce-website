import { Table, Space, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { RoleInfo } from 'types'
import { useRoleManagementContext } from '../../hooks/RoleManagementContext.tsx'
import { useMessageContext } from 'components'
import React, { useState, useEffect } from 'react'
import { SearchBar } from '../SearchBar'
import { CreateRoleForm } from '../modal/CreateRoleForm.tsx'
import { HttpStatusCode } from 'axios'

interface TableData extends RoleInfo {
    key: string
}

interface TableColumn {
    title: string
    dataIndex?: string
    key: string
    render?: (text: any, record: RoleInfo, index: number) => React.ReactNode
    sorter?: (a: any, b: any) => number
    defaultSortOrder?: 'ascend' | 'descend'
}

const sortFunctions: Function[] = [
    (a: string | null, b: string | null) =>
        a && b ? a.localeCompare(b)
                : (a && !b ? 1 : (!a && b ? -1 : 0)),
]

export const RoleList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([])
    const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false)

    const [data, setData] = useState<TableData[]>([])
    const {
        searchResponse,
        roleList,
        totalElements,
        searchRequest: prevSearchRequest,
        setSearchRequest,
        deleteHelper,
        createHelper,
        reFetchRoleList,
    } = useRoleManagementContext()
    const {messageApi} = useMessageContext()
    const columnNames = ['Role name', 'Create user', 'Create date time', 'Modify user', 'Modify date time']
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [searchBarValue, setSearchBarValue] = useState<string>('')
    const onClickSearchBtn = () => {
        const searchBar = document.getElementById('role-search-bar') as HTMLInputElement

        setSearchBarValue(searchBar.value)
        setSearchRequest({
            ...prevSearchRequest,
            sample: {
                roleName: searchBar.value || '',
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

    const handleDelete = async (row: TableData) => {
        const deleteRequest = {
            roleId: row.roleId
        }
        try {
            const deleteResponse = await deleteHelper.mutateAsync(deleteRequest)
            if (!deleteResponse) {
                console.log('deleteResponse is undefined')
            } else if (!deleteResponse.data) {
                console.log('deleteResponse.data is undefined')
            } else {
                if (deleteResponse.data.status === HttpStatusCode.Ok) {
                    console.log('INDEX - Role deleted successfully!')
                    messageApi.success('Role deleted successfully!')
                }
                // else {
                //     console.log('INDEX - Role deleted failed!')
                // }
            }
        }
        catch (error) {
            console.log('ERROR - Role deleted failed!')
            const errObj = error as any
            messageApi.error(errObj.status + ' - '
                + errObj.code + ' - '
                + errObj.response.data.error + ' - '
                + errObj.response.data.message)
        }
        finally {
            reFetchRoleList()
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
                roleName: searchBarValue || ''
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
        setData(
            (roleList || []).map((role, index) => ({
                key: index.toString(),
                ...role,
            }
        )))

        if (roleList && roleList.length > 0) {
            let objectKeys = Object.keys(roleList[0])
            objectKeys = objectKeys.slice(1, 2).concat(objectKeys.slice(3))
            const RoleColumns: TableColumn[] = objectKeys.map((key, index) => ({
                title: columnNames[index],
                dataIndex: key,
                key: index.toString(),
                sorter: (a, b) => sortFunctions[0](a[key], b[key]),
                defaultSortOrder: 'ascend'
            }))

            RoleColumns.push({
                title: 'Actions',
                key: 'actions',
                render: (record: TableData) => (
                    <Space>
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

            setColumns(RoleColumns)
        }
    }, [roleList])

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
            <CreateRoleForm isOpenForm={isOpenCreateForm}
                            setIsOpenForm={setIsOpenCreateForm}
                            createHelper={createHelper}
                            reFetchRoleList={reFetchRoleList}
                            messageApi={messageApi}
            />
        </>
    )
}
