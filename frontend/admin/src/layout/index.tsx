import {SideMenu} from './components/SideMenu'
import {Outlet} from 'react-router-dom'
import React from 'react'

export * from './components/SideMenu'

interface LayoutProps {
    authenticated: boolean | undefined
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    if (!props.authenticated) {
        window.location.assign('/login')
        return <></>
    }
    return (
        <div style={{display: 'flex'}}>
            <SideMenu />
            <div style={{marginLeft: '40px'}}>
                <Outlet />
            </div>
        </div>
    )
}