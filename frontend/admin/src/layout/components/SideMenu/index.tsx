import {
    UserOutlined,
    FilterOutlined,
    ProductOutlined,
    FileTextOutlined,
    SafetyOutlined,
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { REQUEST_MAPPING } from "constants/Path"

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
                        return navigate(REQUEST_MAPPING.USER)
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
                        return navigate(REQUEST_MAPPING.CATEGORY)
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
                        return navigate(REQUEST_MAPPING.ITEM)
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
                        return navigate(REQUEST_MAPPING.ORDER)
                    },
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'role-management',
            icon: <SafetyOutlined />,
            label: 'Role management',
            onClick: () => {
                setSelectedKeys(['role-management'])
                return navigate(REQUEST_MAPPING.ROLE)
            },
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
