package com.admin.constant;

public final class AppRoutes {
    public static final class REQUEST_MAPPING {
        public static final String AUTH = "/admin/auth";
        public static final String ITEM = "/admin/item";
        public static final String CATEGORY = "/admin/category";
        public static final String USER = "/admin/user";
        public static final String ORDER = "/admin/order";
    }

    public static final class REQUEST_PATH {
        public static final String SIGN_IN = "/sign_in";    // TESTED
        public static final String SIGN_OUT = "/sign_out";    // TESTED

        public static final String UPDATE_ITEM = "/update";    // TESTED
        public static final String DELETE_ITEM = "/delete";    // TESTED
        public static final String CREATE_ITEM = "/create";    // TESTED
        public static final String SEARCH_ITEM = "/search";    // TESTED

        public static final String UPDATE_CATEGORY = "/update";    // TESTED
        public static final String DELETE_CATEGORY = "/delete";    // TESTED
        public static final String CREATE_CATEGORY = "/create";    // TESTED
        public static final String SEARCH_CATEGORY = "/search";    // TESTED

        public static final String UPDATE_USER = "/update";    // TESTED
        public static final String DELETE_USER = "/delete";    // TESTED
        public static final String CREATE_USER = "/create";    // TESTED
        public static final String SEARCH_USER = "/search";

        public static final String DELETE_CHILD_ORDER = "/delete-child-order";    // TESTED
        public static final String DELETE_TOTAL_ORDER = "/delete-total-order";    // TESTED
        public static final String SEARCH_TOTAL_ORDER = "/search-total-order";    // TESTED
        public static final String UPDATE_PAYMENT_STATUS_TOTAL_ORDER = "/update-payment-status-total-order";    // TESTED
    }
}
