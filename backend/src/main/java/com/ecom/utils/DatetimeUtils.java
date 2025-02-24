package com.ecom.utils;

import io.github.cdimascio.dotenv.Dotenv;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class DatetimeUtils {
    public static Long getVnpCreateDate() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return Long.parseLong(now.format(formatter));
    }

    public static Long getVnpExpireDate() {
        LocalDateTime expireDate = LocalDateTime.now().plusMinutes(Long.parseLong(Objects.requireNonNull(Dotenv.load().get("VNPAY_EXPIRE_TIME_IN_MINUTE"))));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return Long.parseLong(expireDate.format(formatter));
    }
}
