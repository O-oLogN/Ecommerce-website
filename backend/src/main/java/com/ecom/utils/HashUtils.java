package com.ecom.utils;

import io.github.cdimascio.dotenv.Dotenv;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

public class HashUtils {
    public static String getVnpSecureHash(String queryParams) throws Exception {
        return generateHMACSignature(queryParams, Objects.requireNonNull(Dotenv.load().get("VNPAY_SECRET_KEY")));
    }

    public static String generateHMACSignature(String message, String secretKey) throws Exception {
        Mac hmacSHA512 = Mac.getInstance("HmacSHA512");
        byte[] hmacKeyBytes = secretKey.getBytes();
        final SecretKeySpec secretKeySpec = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
        hmacSHA512.init(secretKeySpec);
        byte[] dataByte = message.getBytes(StandardCharsets.UTF_8);
        byte[] result = hmacSHA512.doFinal(dataByte);
        StringBuilder stringBuilder = new StringBuilder();
        for (byte b : result) {
            stringBuilder.append(String.format("%02x", b & 0xff));
        }
        return stringBuilder.toString();
    }
}
