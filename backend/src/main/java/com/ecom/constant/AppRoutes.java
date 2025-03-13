package com.ecom.constant;

public final class AppRoutes {
    public static final class REQUEST_BRANCH {
        public static final String ADMIN = "/admin";
        public static final String CLIENT = "/user";
    }

    public static final class REQUEST_MAPPING {
        public static final String AUTH = "/auth";
        public static final String ROLE = "/role";
        public static final String ITEM = "/item";
        public static final String CATEGORY = "/category";
        public static final String USER = "/user";
        public static final String ORDER = "/order";
        public static final String HIGHLIGHT = "/highlight";
        public static final String BADGE = "/badge";
        public static final String PAY = "/pay";
    }

    public static final class REQUEST_PATH {
        public static final String SIGN_IN = "/sign_in";
        public static final String SIGN_UP = "/sign_up";
        public static final String SIGN_OUT = "/sign_out";
        public static final String VERIFY_TOKEN = "/verify-token";

        public static final String SEARCH_ROLE = "/search";
        public static final String CREATE_ROLE = "/create";
        public static final String DELETE_ROLE = "/delete";
        public static final String UPDATE_ROLE = "/update";

        public static final String UPDATE_ITEM = "/update";     
        public static final String DELETE_ITEM = "/delete";     
        public static final String CREATE_ITEM = "/create";     
        public static final String SEARCH_ITEM = "/search";     

        public static final String UPDATE_CATEGORY = "/update";     
        public static final String DELETE_CATEGORY = "/delete";     
        public static final String CREATE_CATEGORY = "/create";     
        public static final String SEARCH_CATEGORY_BY_NAME = "/search-by-name";     
        public static final String SEARCH_CATEGORY_BY_ID = "/search-by-id";     

        public static final String UPDATE_USER = "/update";     
        public static final String DELETE_USER = "/delete";     
        public static final String CREATE_USER = "/create";     
        public static final String SEARCH_USER = "/search";

        public static final String DELETE_CHILD_ORDER = "/delete-child-order";     
        public static final String DELETE_TOTAL_ORDER = "/delete-total-order";     
        public static final String SEARCH_TOTAL_ORDER = "/search-total-order";
        public static final String SEARCH_CHILD_ORDERS = "/search-child-orders";
        public static final String CREATE_TOTAL_ORDER = "/create-total-order";
        public static final String SEARCH_USER_ID_BY_USERNAME = "/search-user-id-by-username";
        public static final String UPDATE_PAYMENT_STATUS_TOTAL_ORDER = "/update-payment-status-total-order";
        public static final String UPDATE_TOTAL_ORDER_STATUS = "/update-total-order-status";
        public static final String GET_LATEST_ORDER_CODE = "/get-latest-order-code";

        public static final String UPDATE_HIGHLIGHT = "/update";
        public static final String DELETE_HIGHLIGHT = "/delete";
        public static final String CREATE_HIGHLIGHT = "/create";
        public static final String SEARCH_HIGHLIGHT = "/search";

        public static final String UPDATE_BADGE = "/update";
        public static final String DELETE_BADGE = "/delete";
        public static final String CREATE_BADGE = "/create";
        public static final String SEARCH_BADGE = "/search";    

        public static final String INIT_PAY_REQUEST = "/init-pay-request";
        public static final String GET_IP = "/get-ip";
        public static final String GET_VNPAY_TRANSACTION = "/get-vnpay-transaction";
    }
}
