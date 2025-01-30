package com.admin.constant;

public final class AppRoutes {
    public static final class REQUEST_MAPPING {
        public static final String AUTH = "/admin/auth";
        public static final String ROLE = "/admin/role";
        public static final String ITEM = "/admin/item";
        public static final String CATEGORY = "/admin/category";
        public static final String USER = "/admin/user";
        public static final String ORDER = "/admin/order";
    }

    public static final class REQUEST_PATH {
        public static final String SIGN_IN = "/sign_in";     
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
