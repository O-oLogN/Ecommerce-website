import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { UserInfo } from 'src/types';
import { useUserManagementContext } from '../../hooks/UserManagementContext.tsx';
import React, { useState, useEffect } from 'react';

interface TableData extends UserInfo {
    key: string;
}

interface TableColumn {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (text: any, record: UserInfo, index: number) => React.ReactNode;
}

export const UserList = () => {
    const [columns, setColumns] = useState<TableColumn[]>([]);
    const [data, setData] = useState<TableData[]>([]);
    const { userList } = useUserManagementContext();
    const columnNames = ['User ID', 'Username', 'Password', 'Email', 'Create user', 'Create date time', 'Modify user', 'Modify date time']

    const handleEdit = (row: UserInfo) => {
        console.log('Edit clicked for:', row);
    };

    const handleDelete = (row: UserInfo) => {
        console.log('Delete clicked for:', row);
    };

    useEffect(() => {
        setData(
            (userList || []).map((user, index) => ({
                key: index.toString(),
                ...user,
            }))
        );

        if (userList && userList.length > 0) {
            const userColumns: TableColumn[] = Object.keys(userList[0]).map((key, index) => ({
                title: columnNames[index],
                dataIndex: key,
                key: index.toString(),
            }));

            userColumns.push({
                title: 'Actions',
                key: 'actions',
                render: (record: UserInfo) => (
                    <Space>
                        <Button type="link" onClick={() => handleEdit(record)}>
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

    return <Table dataSource={data} columns={columns} />;
};
