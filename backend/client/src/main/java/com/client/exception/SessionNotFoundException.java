package com.client.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SessionNotFoundException extends Exception {
    public SessionNotFoundException(String message) {
        super(message);
    }
}
