import {createContext, useContext, useEffect, useState} from "react"
import {HomePageContextProps} from "pages/HomePage/types"
import {CategoryInfo, ItemInfo} from "types"
import {useSearchCategoryById, useSearchItem} from "services"
import {HttpStatusCode} from "axios"

const HomePageContext = createContext<HomePageContextProps>({
    categories: [],
    products: [],
    selectedProduct: null,
    setSelectedProduct: () => {},
})

export const HomePageContextProvider = ({ children } : { children: any })=> {
    const [products, setProducts] = useState<ItemInfo[]>([])
    const [categories, setCategories] = useState<CategoryInfo[]>([])
    const [selectedProduct, setSelectedProduct] = useState<ItemInfo | null>(null)
    const searchCategoryMutation = useSearchCategoryById()
    const searchProductsResponse = useSearchItem({
        sample: {
            itemName: ''
        },
        pageInfo: {
            pageNumber: 0,
            pageSize: 100,
        },
        orders: [],
    })

    useEffect(() => {
        if (searchProductsResponse.data?.status === HttpStatusCode.Ok) {
            const productsFound = searchProductsResponse.data?.data?.content
            setProducts(productsFound!)
        }
    }, [searchProductsResponse.data])

    useEffect(() => {
        if (products && products.length) {
            const fetchCategories = async () => {
                const categoryPromises = products.map(async (product) => {
                    const searchCategoryResponse = await searchCategoryMutation.mutateAsync({
                        categoryId: product.categoryId
                    })
                    return searchCategoryResponse.data
                })
                const categoriesFound = await Promise.all(categoryPromises) as CategoryInfo[]
                const categoryMap: Map<string, CategoryInfo> = new Map()
                categoriesFound.filter(categoryFound => categoryFound).forEach(
                    categoryFound => categoryMap.set(categoryFound.categoryId, categoryFound)
                )
                setCategories([...categoryMap.values()])
            }
            fetchCategories().then(() => {})
        }
    }, [products])

    const value = {
        categories,
        products,
        selectedProduct,
        setSelectedProduct,
    }
    return (
        <HomePageContext.Provider value={ value } >
            { children }
        </HomePageContext.Provider>
    )
}

export const useHomePageContext = () => {
    return useContext(HomePageContext)
}