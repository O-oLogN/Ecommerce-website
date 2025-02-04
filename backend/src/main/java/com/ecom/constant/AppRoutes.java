package com.ecom.constant;

public final class AppRoutes {
    public static final class REQUEST_BRANCH {
        public static final String ADMIN = "/admin";
        public static final String CLIENT = "/user";
    }

    public static final class REQUEST_MAPPING {
        public static final String AUTH = "/auth";
        public static final String ROLE = "role";
        public static final String ITEM = "/item";
        public static final String CATEGORY = "/category";
        public static final String USER = "/user";
        public static final String ORDER = "/order";
    }

    public static final class REQUEST_PATH {
        public static final String SIGN_IN = "/sign_in";
        public static final String SIGN_UP = "/sign_up";
        public static final String SIGN_OUT = "/sign_out";     

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
        public static final String UPDATE_PAYMENT_STATUS_TOTAL_ORDER = "/update-payment-status-total-order";     
    }
}
