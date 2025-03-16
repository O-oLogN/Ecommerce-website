import ProductList from "layout/ProductList/ProductList.tsx"
import {useHomePageContext} from "./hooks/HomePageContext.tsx"
import { Select } from "antd"

const HomePage = () => {
    const {
        categories,
        products,
        setSelectedProduct,
        setSearchItemRequest,
    } = useHomePageContext()

    const handleChange = (value: any) => {
        setSearchItemRequest({
            sample: {
                itemName: '',
            },
            pageInfo: {
                pageNumber: 0,
                pageSize: 100,
            },
            orders: [{
                property: value,
                direction: 'asc'
            }]
        })
    }

    return (
        <>
            <Select
                defaultValue="Sort by"
                style={{
                    width: "120px",
                    position: "absolute",
                    marginLeft: "1200px",
                    marginTop: "50px",
                }}
                onChange={ handleChange }
                options={[
                    {
                        label: "Rating",
                        value: "rate",
                    },
                    {
                        label: "Price",
                        value: "price",
                    }
                ]}
            />
            <ProductList
                categories={ categories }
                products={ products }
                setSelectedProduct={ setSelectedProduct }
            />
        </>
    )
}

export default HomePage