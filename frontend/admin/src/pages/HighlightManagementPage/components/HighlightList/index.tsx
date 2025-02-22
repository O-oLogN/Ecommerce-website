import { Table, Space, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useMessageContext } from 'components'
import React, { useState, useEffect } from 'react'
import { HttpStatusCode } from 'axios'
import { HighlightInfo } from "types"
import { useHighlightManagementContext } from 'pages/HighlightManagementPage/hooks/HighlightManagementContext'
import { SearchBar } from '../SearchBar'
import { CreateHighlightForm } from "pages/HighlightManagementPage/components/modal/CreateHighlightForm.tsx"

interface TableData extends HighlightInfo {
    key: string
}

const sortFunctions: Function[] = [
    (a: string | null, b: string | null) =>
        a && b ? a.localeCompare(b)
            : (a && !b ? 1 : (!a && b ? -1 : 0)),

    (_a: any, _b: any) => {
        return 0
    }
]

interface TableColumn {
    title: string
    dataIndex?: string
    key: string
    render?: (text: any, record: TableData, index: number) => React.ReactNode
    sorter?: (a: any, b: any) => number
    defaultSortOrder?: 'ascend' | 'descend'
}

export const HighlightList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([])
    const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false)
    const [highlightList, setHighlightList] = useState<HighlightInfo[]>([])
    const [totalElements, setTotalElements] = useState<number>(0)
    const [data, setData] = useState<TableData[]>([])
    const { messageApi } = useMessageContext()
    const columnNames = ['Highlight content', 'Create user', 'Create date time', 'Modify user', 'Modify date time']
    const columnDataIndexes = ['content', 'createUser', 'createDatetime', 'modifyUser', 'modifyDatetime']
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [pageSize, setPageSize] = useState<number>(10)
    const [searchBarValue, setSearchBarValue] = useState<string>('')

    const {
        createHelper,
        deleteHelper,
        setSearchRequest,
        searchResponse: searchHighlightResponse,
        reFetchHighlightList,
    } = useHighlightManagementContext()

    const onClickSearchBtn = () => {
        const searchBar = document.getElementById('highlight-search-bar') as HTMLInputElement

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
            const deleteResponse = await deleteHelper.mutateAsync(row.highlightId)
            if (!deleteResponse) {
                console.log('deleteResponse is undefined')
            } else if (!deleteResponse.data) {
                console.log('deleteResponse.data is undefined')
            } else {
                if (deleteResponse.data.status === HttpStatusCode.Ok) {
                    console.log('INDEX - Highlight deleted successfully!')
                    messageApi.success('Highlight deleted successfully!')
                }
            }
        }
        catch (error) {
            console.log('ERROR - Highlight deleted failed!')
            const errObj = error as any
            messageApi.error(errObj.status + ' - '
                + errObj.code + ' - '
                + errObj.response.dat.error + ' - '
                + errObj.response.data.message)
        }
        finally {
            reFetchHighlightList!()
        }
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

    const handleCreate = () => {
        setIsOpenCreateForm(true)
    }

    const addBtnStyle = {
        width: '100px',
        marginLeft: '90%',
        marginBottom: '10px'
    }

    useEffect(() => {
        if (searchHighlightResponse && searchHighlightResponse.data && (searchHighlightResponse.data.status === HttpStatusCode.Ok || searchHighlightResponse.data.status === HttpStatusCode.Accepted)) {
            setHighlightList(searchHighlightResponse.data.data.content ?? [])
            setTotalElements(searchHighlightResponse.data ? searchHighlightResponse.data.data.totalElements : 0)
        }
    }, [searchHighlightResponse])

    useEffect(() => {
        setData(
            (highlightList || []).map((highlight, index) => ({
                    key: index.toString(),
                    ...highlight,
                }
            )))

        if (highlightList && highlightList.length > 0) {
            let objectKeys = Object.keys(highlightList[0])
            objectKeys = objectKeys.slice(1, 2).concat(objectKeys.slice(3))
            const highlightColumns: TableColumn[] = objectKeys.map((key, index) => ({
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
            }))

            highlightColumns.push({
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

            setColumns(highlightColumns)
        }
    }, [highlightList])

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
                loading={searchHighlightResponse ? (searchHighlightResponse!.isLoading || searchHighlightResponse!.isRefetching) : true}
            >
            </Table>
            <CreateHighlightForm isOpenForm={isOpenCreateForm}
                            setIsOpenForm={setIsOpenCreateForm}
                            createHelper={createHelper}
                            reFetchHighlightList={reFetchHighlightList!}
                            messageApi={messageApi}
            />
        </>
    )
}
