package com.ecom.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsernameAlreadyExistsException extends Exception {
    public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
