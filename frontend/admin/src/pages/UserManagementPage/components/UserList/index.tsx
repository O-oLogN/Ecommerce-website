import {Table} from 'antd'
import {UserInfo} from 'src/types'
import {useUserManagementContext} from '../../hooks/UserManagementContext.tsx'

interface TableData extends UserInfo {
    key: string
}

interface TableColumn {
    title: string
    dataIndex: string
    key: string
}

export const UserList = () => {
    const {
        userList,
        // searchRequest,
        // setSearchRequest,
    } = useUserManagementContext()

    const data: TableData[] | undefined = userList?.map((user, index) => {
        return { key: index.toString(), ...user } as TableData
    })

    const columns: TableColumn[] | undefined = userList?.map((user, index) => {
        return {
            title: Object.keys(user)[index],
            dataIndex: Object.keys(user)[index],
            key: index.toString(),
        } as TableColumn
    })
    
    return (
        <Table dataSource={data} columns={columns}>
        </Table>
    )
}