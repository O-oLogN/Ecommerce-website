import {SideMenu} from './components/SideMenu'
import {Outlet} from 'react-router-dom'

export * from './components/SideMenu'

export default function Layout() {
    return (
        <>
            <SideMenu />
            <Outlet />
        </>
    )
}