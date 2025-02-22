import {
    UserOutlined,
    FilterOutlined,
    ProductOutlined,
    FileTextOutlined,
    SafetyOutlined,
    FireOutlined,
    BulbOutlined,
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import {useEffect, useState} from 'react'
import { REQUEST_MAPPING } from "constants/Path"

export const SideMenu = () => {
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    useEffect(() => {
        switch (window.location.href) {
            case 'http://localhost:5173' + REQUEST_MAPPING.USER:
                setSelectedKeys(['user-management'])
                break
            case 'http://localhost:5173' + REQUEST_MAPPING.ITEM:
                setSelectedKeys(['item-management'])
                break
            case 'http://localhost:5173' + REQUEST_MAPPING.CATEGORY:
                setSelectedKeys(['category-management'])
                break
            case 'http://localhost:5173' + REQUEST_MAPPING.ORDER:
                setSelectedKeys(['order-management'])
                break
            case 'http://localhost:5173' + REQUEST_MAPPING.ROLE:
                setSelectedKeys(['role-management'])
                break
            case 'http://localhost:5173' + REQUEST_MAPPING.BADGE:
                setSelectedKeys(['badge-management'])
                break
            case 'http://localhost:5173' + REQUEST_MAPPING.HIGHLIGHT:
                setSelectedKeys(['highlight-management'])
                break

        }
    }, [window.location.href])

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
        {
            key: 'badge-management',
            icon: <FireOutlined />,
            label: 'Badge management',
            onClick: () => {
                setSelectedKeys(['badge-management'])
                return navigate(REQUEST_MAPPING.BADGE)
            },
        },
        {
            key: 'highlight-management',
            icon: <BulbOutlined />,
            label: 'Highlight management',
            onClick: () => {
                setSelectedKeys(['highlight-management'])
                return navigate(REQUEST_MAPPING.HIGHLIGHT)
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
