package com.admin.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemNotFoundException extends Exception {
    public ItemNotFoundException(String message) {
        super(message);
    }
}
