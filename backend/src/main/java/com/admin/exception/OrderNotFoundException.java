package com.admin.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderNotFoundException extends Exception {
    public OrderNotFoundException(String message) {
        super(message);
    }
}
