import {message} from 'antd'
import {useAppContext} from './hooks/AppContext.tsx'
import {AppContextProps} from 'types'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {
    LoginPage,
    UserManagementPage, 
    CategoryManagementPage,
    ItemManagementPage,
} from 'pages'
import {SideMenu} from 'layout/components/SideMenu'
import {RoleManagementPage} from "pages/RoleManagementPage"
import {REQUEST_MAPPING, REQUEST_PATH} from "constants/Path"
import {useNavigate} from 'react-router-dom'
import React, {useEffect} from "react"


export const App = () => {

    message.config({
        maxCount: 1,
    })
    const {
        authenticated,
        setAuthenticated: setAppAuthenticated,
    } = useAppContext() as AppContextProps
    return (
        <Router>
            <Routes>
                <Route path={REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN} element={<LoginPage setAppAuthenticated={setAppAuthenticated} />} />
            </Routes>
            <InternalZone authenticated={authenticated} />
        </Router>
    )
}

interface InternalZoneProps {
    authenticated: boolean
}
const InternalZone: React.FC<InternalZoneProps> = ({ authenticated }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!authenticated) {
            navigate(REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN)
        }
        else {
            if (window.location.href === "http://localhost:5173" + REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN) {
                navigate(REQUEST_MAPPING.USER)
            }
        }
    }, [authenticated])

    if (!authenticated) {
        return <></>
    }

    return (
       <>
           <SideMenu/>
           <Routes>
               <Route path="/">
                   <Route path={REQUEST_MAPPING.USER}
                          element={<UserManagementPage/>}/>
                   <Route path={REQUEST_MAPPING.CATEGORY}
                          element={<CategoryManagementPage/>}/>
                   <Route path={REQUEST_MAPPING.ITEM}
                          element={<ItemManagementPage/>}/>
                   <Route path={REQUEST_MAPPING.ROLE}
                          element={<RoleManagementPage/>}/>
               </Route>
           </Routes>
       </>
   )
}