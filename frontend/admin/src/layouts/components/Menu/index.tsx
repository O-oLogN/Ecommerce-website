import {UserOutlined, FilterOutlined, ProductOutlined, FileTextOutlined} from '@ant-design/icons'
import {Menu, MenuProps} from 'antd'
import {useNavigate} from 'react-router-dom'

const onClickUserManagement = () => {
    useNavigate('/user-management')
}
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
                key: 'user-managemnet',
                icon: <UserOutlined />,
                label: 'User management',
                onClick:
            },
            {
                type: 'divider',
            },
            {
                key: 'category-managemnet',
                icon: <FilterOutlined />,
                label: 'Category management',
            },
            {
                type: 'divider',
            },
            {
                key: 'item-managemnet',
                icon: <ProductOutlined />,
                label: 'Item management',
            },
            {
                type: 'divider',
            },
            {
                key: 'order-managemnet',
                icon: <FileTextOutlined />,
                label: 'Order management',
            },
        ]
    },
    {
        type: 'divider',
    },
]

export const SideMenu = () => {
    return (
        <Menu
            onClick={(info) => {
                console.log(info.key)
            }}
            className='side-menu'
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
    )
}
