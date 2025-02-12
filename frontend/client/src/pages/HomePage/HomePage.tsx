import ProductList from "layout/ProductList/ProductList.tsx"
import {useHomePageContext} from "./hooks/HomePageContext.tsx"
import {useNavbarContext} from "layout/Navbar/hooks"

const HomePage = () => {
    const {
        categories,
        products,
        setSelectedProduct,
    } = useHomePageContext()

    const { setItemsInCart } = useNavbarContext()

    return (
        <ProductList
            categories={ categories }
            products={ products }
            setItemsInCart={ setItemsInCart }
            setSelectedProduct={ setSelectedProduct }
        />
    )
}

export default HomePage