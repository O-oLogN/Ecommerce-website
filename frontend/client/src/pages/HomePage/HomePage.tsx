import ProductList from "layout/ProductList/ProductList.tsx"
import {useHomePageContext} from "./hooks/HomePageContext.tsx"
import {useNavbarContext} from "layout/Navbar/hooks/NavbarContext.tsx"

const HomePage = () => {
    const {
        categories,
        products,
        setSelectedProduct,
    } = useHomePageContext()

    const {
        itemsInCart,
        setItemsInCart,
    } = useNavbarContext()

    return (
        <ProductList
            categories={ categories }
            products={ products }
            itemsInCart={ itemsInCart }
            setItemsInCart={ setItemsInCart }
            setSelectedProduct={ setSelectedProduct }
        />
    )
}

export default HomePage