package com.client.utils;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

public class ValidationUtils {

    public static boolean isNullOrEmpty(String st) {
        return st == null || st.isEmpty() || st.equals("''");
    }

    public static boolean isNullOrEmpty(Object obj) {
        return obj == null || obj.toString().isEmpty();
    }

    public static boolean datetimeLike24hFormat(String str) {
        // FORMAT_24H will be converted to ISO-8601 format when calling LocalDateTime.toString()
        String pattern = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])(\\.\\d+)?(Z|[+-]([01][0-9]|2[0-3]):[0-5][0-9])?$\n";
        return str.matches(pattern);
    }

    public static boolean isNullOrEmpty(List<?> lst) {
        return lst == null || lst.isEmpty();
    }

    public static boolean isNullOrEmpty(Map<?, ?> map) {
        return map == null || map.isEmpty();
    }

    public static boolean isNullOrEmpty(Collection<?> collection) {
        return collection == null || collection.isEmpty();
    }

    public static boolean isUUIDString(String input) {
        Pattern pattern = Pattern.compile("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
        return pattern.matcher(input).matches();
    }
}
