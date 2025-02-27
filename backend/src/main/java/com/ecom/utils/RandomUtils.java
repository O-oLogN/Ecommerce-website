package com.ecom.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class RandomUtils {
    public static String generateRandomString() {
        UUID uuid = UUID.randomUUID();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateTime = sdf.format(new Date());
        return uuid + "_" + dateTime;
    }
}
