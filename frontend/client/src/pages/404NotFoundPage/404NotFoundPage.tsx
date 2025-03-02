import {PAGES} from "routes"

const NotFoundPage = () => {
    if (PAGES.includes(window.location.pathname)) {
        return <></>
    }
    return (
        <div className="ml-[500px] mt-[150px]">
            <p className="font-semibold text-[4.2rem]">404</p>
            <p className="font-semibold text-[4.2rem]">Page not found!</p>
            <p className="text-[2rem]">This page generated for this purpose</p>
        </div>
    )
}

export default NotFoundPage