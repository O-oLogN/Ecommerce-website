export const REQUEST_MAPPING = {
    AUTH: '/user/auth',
    ITEM: '/user/item',
    CATEGORY: '/user/category',
    HOMEPAGE: '/user/homepage',
    CART: '/user/cart',
    CHECKOUT: '/user/checkout',
    ORDER: '/user/order',
    PAY: '/user/pay',
}

export const REQUEST_PATH = {
    SIGN_IN: '/sign_in',
    SIGN_UP: '/sign_up',
    VERIFY_TOKEN: '/verify-token',

    SEARCH_ITEM: '/search',
    ITEM_DETAILS: '/details',

    SEARCH_CATEGORY_BY_ID: '/search-by-id',

    SEARCH_USER_ID_BY_USERNAME: '/search-user-id-by-username',
    CREATE_TOTAL_ORDER: '/create-total-order',
    GET_LATEST_ORDER_CODE: '/get-latest-order-code',

    GET_IP_ADDRESS: '/get-ip',
    INIT_PAY_REQUEST: '/init-pay-request',
    PAY_RESULT: '/pay-result',
    GET_VNPAY_TRANSACTION: '/get-vnpay-transaction',
}

export const PAGES = [
    '/user/auth/sign_in',
    '/user/auth/sign_up',
    '/user/item/search',
    '/user/item/details',
    '/user/homepage',
    '/user/checkout',
    '/user/cart',
    '/user/pay/pay-result',
]