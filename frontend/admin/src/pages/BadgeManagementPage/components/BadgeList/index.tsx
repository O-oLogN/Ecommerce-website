import { Table, Space, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useMessageContext } from 'components'
import React, { useState, useEffect } from 'react'
import { HttpStatusCode } from 'axios'
import { BadgeInfo } from "types"
import { useBadgeManagementContext } from 'pages/BadgeManagementPage/hooks/BadgeManagementContext'
import { SearchBar } from '../SearchBar'
import { CreateBadgeForm } from "pages/BadgeManagementPage/components/modal/CreateBadgeForm.tsx"

interface TableData extends BadgeInfo {
    key: string
}

interface TableColumn {
    title: string
    dataIndex?: string
    key: string
    render?: (text: any, record: TableData, index: number) => React.ReactNode
    sorter?: (a: any, b: any) => number
    defaultSortOrder?: 'ascend' | 'descend'
}

const sortFunctions: Function[] = [
    (a: string | null, b: string | null) =>
        a && b ? a.localeCompare(b)
            : (a && !b ? 1 : (!a && b ? -1 : 0)),

    (_a: any, _b: any) => {
        return 0
    }
]

export const BadgeList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([])
    const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false)
    const [badgeList, setBadgeList] = useState<BadgeInfo[]>([])
    const [totalElements, setTotalElements] = useState<number>(0)
    const [data, setData] = useState<TableData[]>([])
    const { messageApi } = useMessageContext()
    const columnNames = ['Badge icon', 'Badge description', 'Create user', 'Create date time', 'Modify user', 'Modify date time']
    const columnDataIndexes = ['iconUrl', 'description', 'createUser', 'createDatetime', 'modifyUser', 'modifyDatetime']
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [searchBarValue, setSearchBarValue] = useState<string>('')

    const {
        createHelper,
        deleteHelper,
        setSearchRequest,
        searchResponse: searchBadgeResponse,
        reFetchBadgeList,
    } = useBadgeManagementContext()

    const onClickSearchBtn = () => {
        const searchBar = document.getElementById('badge-search-bar') as HTMLInputElement

        setSearchBarValue(searchBar.value)
        setSearchRequest({
            sample: searchBarValue,
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
        try {
            const deleteResponse = await deleteHelper.mutateAsync(row.badgeId)
            if (!deleteResponse) {
                console.log('deleteResponse is undefined')
            } else if (!deleteResponse.data) {
                console.log('deleteResponse.data is undefined')
            } else {
                if (deleteResponse.data.status === HttpStatusCode.Ok) {
                    console.log('INDEX - Badge deleted successfully!')
                    messageApi.success('Badge deleted successfully!')
                }
            }
        }
        catch (error) {
            console.log('ERROR - Badge deleted failed!')
            const errObj = error as any
            messageApi.error(errObj.status + ' - '
                + errObj.code + ' - '
                + errObj.response.dat.error + ' - '
                + errObj.response.data.message)
        }
        finally {
            reFetchBadgeList!()
        }
    }

    const handleCreate = () => {
        setIsOpenCreateForm(true)
    }

    const handleTableChange = (pagination: any) => {
        setPageNumber(pagination.current - 1)
        setPageSize(pagination.pageSize)
        setSearchRequest({
            sample: '',
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
        if (searchBadgeResponse && searchBadgeResponse.data && (searchBadgeResponse.data.status === HttpStatusCode.Ok || searchBadgeResponse.data.status === HttpStatusCode.Accepted)) {
            setBadgeList(searchBadgeResponse.data.data.content ?? [])
            setTotalElements(searchBadgeResponse.data ? searchBadgeResponse.data.data.totalElements : 0)
        }
    }, [searchBadgeResponse])

    useEffect(() => {
        setData(
            (badgeList || []).map((badge, index) => ({
                    key: index.toString(),
                    ...badge,
                }
            )))

        if (badgeList && badgeList.length > 0) {
            let objectKeys = Object.keys(badgeList[0])
            objectKeys = objectKeys.slice(1, 2).concat(objectKeys.slice(3))
            const badgeColumns: TableColumn[] = objectKeys.map((key, index) => ({
                title: columnNames[index],
                dataIndex: columnDataIndexes[index],
                key: index.toString(),
                sorter: (a, b) => {
                    const typeA = typeof a
                    return typeA === 'string'
                        ? sortFunctions[0](a[key], b[key])
                        : sortFunctions[1](a[key], b[key])
                },
                defaultSortOrder: 'ascend',
                render: (text: any, record: TableData) => {
                    if (key === 'iconMinioGetUrl') {
                        return <img src={record.iconMinioGetUrl ?? '#'} alt="Badge icon" />
                    }
                    return text // For other columns, just render the text
                }
            }))

            badgeColumns.push({
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
            })

            setColumns(badgeColumns)
        }
    }, [badgeList])

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
                loading={searchBadgeResponse ? (searchBadgeResponse!.isLoading || searchBadgeResponse!.isRefetching) : true}
            >
            </Table>
            <CreateBadgeForm isOpenForm={isOpenCreateForm}
                            setIsOpenForm={setIsOpenCreateForm}
                            createHelper={createHelper}
                            reFetchBadgeList={reFetchBadgeList!}
                            messageApi={messageApi}
            />
        </>
    )
}
