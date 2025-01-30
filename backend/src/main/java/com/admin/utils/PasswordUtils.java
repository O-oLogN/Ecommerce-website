package com.admin.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtils {
        private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static String encryptPassword(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    public static boolean verifyPassword(String rawPassword, String hashedCorrectPassword) {
        return encoder.matches(rawPassword, hashedCorrectPassword);
    }
}
