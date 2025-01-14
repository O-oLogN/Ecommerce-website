import { UserOutlined, FilterOutlined, ProductOutlined, FileTextOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const SideMenu = () => {
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    const items: MenuProps['items'] = [
        {
            key: 'dashboard',
            type: 'group',
            label: 'Dashboard',
            children: [
                {
                    type: 'divider',
                },
                {
                    key: 'user-management',
                    icon: <UserOutlined />,
                    label: 'User management',
                    onClick: () => {
                        setSelectedKeys(['user-management'])
                        return navigate('/user-management')
                    },
                },
                {
                    type: 'divider',
                },
                {
                    key: 'category-management',
                    icon: <FilterOutlined />,
                    label: 'Category management',
                    onClick: () => {
                        setSelectedKeys(['category-management'])
                        return navigate('/category-management')
                    },
                },
                {
                    type: 'divider',
                },
                {
                    key: 'item-management',
                    icon: <ProductOutlined />,
                    label: 'Item management',
                    onClick: () => {
                        setSelectedKeys(['item-management'])
                        return navigate('/item-management')
                    },
                },
                {
                    type: 'divider',
                },
                {
                    key: 'order-management',
                    icon: <FileTextOutlined />,
                    label: 'Order management',
                    onClick: () => {
                        setSelectedKeys(['order-management'])
                        return navigate('/order-management')
                    },
                },
            ],
        },
        {
            type: 'divider',
        },
    ]

    return (
        <Menu
            onClick={(info) => {
                console.log(info.key);
            }}
            className="side-menu"
            style={{
                width: 256,
            }}
            selectedKeys={selectedKeys}
            mode="inline"
            items={items}
        />
    )
}
