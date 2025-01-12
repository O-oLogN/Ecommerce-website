import {UserOutlined, FilterOutlined, ProductOutlined, FileTextOutlined} from '@ant-design/icons'
import {Menu, MenuProps} from 'antd'
import {useNavigate} from 'react-router-dom'

const navigate = useNavigate()
const onClickUserManagement = () => {
    navigate('/user-management')
}
const onClickCategoryManagement = () => {
    navigate('/category-management')
}
const onClickItemManagement = () => {
    navigate('/item-management')
}
const onClickOrderManagement = () => {
    navigate('/order-management')
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
                onClick: () => onClickUserManagement,
            },
            {
                type: 'divider',
            },
            {
                key: 'category-managemnet',
                icon: <FilterOutlined />,
                label: 'Category management',
                onClick: () => onClickCategoryManagement,
            },
            {
                type: 'divider',
            },
            {
                key: 'item-managemnet',
                icon: <ProductOutlined />,
                label: 'Item management',
                onClick: () => onClickItemManagement,
            },
            {
                type: 'divider',
            },
            {
                key: 'order-managemnet',
                icon: <FileTextOutlined />,
                label: 'Order management',
                onClick: () => onClickOrderManagement,
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
