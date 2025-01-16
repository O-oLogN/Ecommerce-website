import {SideMenu} from './components/SideMenu'
import {Outlet} from 'react-router-dom'

export * from './components/SideMenu'

export default function Layout() {
    return (
        <div style={{display: 'flex'}}>
            <SideMenu />
            <div style={{marginLeft: '40px'}}>
                <Outlet />
            </div>
        </div>
    )
}