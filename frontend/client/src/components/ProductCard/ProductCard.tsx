import Highlight from "components/ProductCard/Highlight.tsx"
import ProductName from "components/ProductCard/ProductName.tsx"
import Rating from "components/ProductCard/Rating.tsx"
import Badge from "components/ProductCard/Badge.tsx"
import {BadgeProps, ProductCardProps} from "components/types"
import React, {useState} from "react"
import {ItemInfo} from "types"
import {REQUEST_MAPPING, REQUEST_PATH} from "routes"
import {useNavigate} from "react-router-dom"
import details from "assets/details.png"
import {getItemFromLocalStorage} from "utils/LocalStorageUtils"
import {useAppContext} from "hooks/AppContext.tsx"

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const {
        setUpdateItemInCartRequest,
    } = useAppContext()

    const navigate = useNavigate()
    const [love, setLove] = useState<boolean>(false)

    const highlightsArr = props.highlights?.map(highlight => <Highlight content={ highlight.content } />)
    let badgesArr: BadgeProps[] = []
    for (let i = 0; i < props.badges.length; ++i) {
        badgesArr.push({
            iconUrl: props.badges[i].iconMinioGetUrl ?? '#',
            description: props.badges[i].description,
        })
    }
    const badgeElementsArr = badgesArr?.map(badge =>
        <li className="flex items-center gap-2">
            <Badge iconUrl={ badge.iconUrl }
                   description={ badge.description }
            />
        </li>
    )
    const onLoveButtonClick = () => {
        setLove(!love)
    }
    const onAddToCartButtonClick = () => {
        const thisItem = props as ItemInfo
        setUpdateItemInCartRequest({
            username: getItemFromLocalStorage("username") ?? '@',
            itemId: thisItem.itemId,
            itemQuantity: Math.min(props.quantity, 1)
        })
    }
    const onDetailsButtonClick = () => {
        props.setSelectedProduct(props as ItemInfo)
        navigate(REQUEST_MAPPING.ITEM + REQUEST_PATH.ITEM_DETAILS)
    }

    return (
        <div className="p-6 h-[650px] bg-primary-50 w-[350px] mr-[20px] ml-[20px] mt-[20px] pb-[10px] hover:bg-blue-200 hover:cursor-pointer hover:scale-[110%] transition-transform duration-300 ease-in-out">
            <div className="mb-4 relative flex items-center justify-between gap-4">
                <img src={ props.imageMinioGetUrl ?? '#' } alt='Product image' />
                <div className="absolute top-2">
                    { highlightsArr?.map(highlight => highlight) }
                </div>
                <div className="flex absolute top-1 -right-1 items-center justify-end gap-1">
                    <button
                        type="button"
                        data-tooltip-target="tooltip-add-to-favorites"
                        onClick={ onLoveButtonClick }
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <span className="sr-only"> Add to Favorites </span>
                        { !love && <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                            />
                        </svg> }
                        { love && <svg
                            className="h-5 w-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="red"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={0}
                                d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                            />
                        </svg> }
                    </button>
                    <div
                        id="tooltip-add-to-favorites"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                        data-popper-placement="top"
                    >
                        Add to favorites
                        <div className="tooltip-arrow" data-popper-arrow="" />
                    </div>
                </div>
            </div>
            <div>
                <ProductName name={ props.name } href='#' />
                { props.numberOfReviews !== 0 && <Rating rate={ props.rate! } numberOfReviews={ props.numberOfReviews }/> }
                { props.numberOfReviews === 0 && <br /> }
            </div>
            <ul className="mt-2 flex items-center gap-4">
                <div >
                    { badgeElementsArr.length && badgeElementsArr.map(badgeElement => badgeElement) }
                </div>
            </ul>
            <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                    ${ props.price?.toFixed(1) }
                </p>
                <button type="button"
                    className="bg-green-300 rounded-lg items-center inline-flex px-2.5 py-2.5 text-sm font-medium hover:bg-green-700"
                    onClick={onDetailsButtonClick}
                >
                    <img src={details} alt="details-button" height={10} width={10}/>
                    See details
                </button>
                <button
                    type="button"
                    className="inline-flex items-center rounded-lg bg-primary-500 px-2.5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={ onAddToCartButtonClick }
                >
                    <svg
                        className="-ms-2 me-2 h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                        />
                    </svg>
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard