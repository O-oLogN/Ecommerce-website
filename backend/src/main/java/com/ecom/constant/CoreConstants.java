package com.ecom.constant;


public final class CoreConstants {
    public static final class Uuid {
        public static final String UUID_GENERATOR = "uuid2";
    }

    public static final class DateTimePattern {
        public static final String FORMAT_24H = "dd/MM/yyyy HH:mm:ss";
    }

    public static final class ROLE {
        public static final String ADMIN = "ADMIN";
        public static final String USER = "USER";
    }

    public static final class PAYMENT_STATUS {
        public static final Integer UNPAID = 0;
        public static final Integer PAID = 1;
    }

    public static final class TOTAL_ORDER_STATUS {
        public static final Integer ACTIVE = 1;
        public static final Integer INACTIVE = 0;
    }
}
