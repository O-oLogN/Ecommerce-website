package com.client.constant;

public final class AppRoutes {
    public static final class REQUEST_MAPPING {
        public static final String AUTH = "/client/auth";
        public static final String ITEM = "/client/item";
        public static final String USER = "/client/user";
        public static final String ORDER = "/client/order";
    }

    public static final class REQUEST_PATH {
        public static final String SIGN_IN = "/sign-in";    // TESTED
        public static final String SIGN_UP = "/sign-up";
        public static final String SIGN_OUT = "/sign-out";    // TESTED

        public static final String SEARCH_ITEM = "/search";

        public static final String UPDATE_USER = "/update";

        public static final String DELETE_CHILD_ORDER = "/delete-child-order";
        public static final String DELETE_TOTAL_ORDER = "/delete-total-order";
        public static final String CREATE_TOTAL_ORDER = "/create-total-order";
    }
}
