package com.admin.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleNotFoundException extends Exception {
    public RoleNotFoundException(String message) { super(message); }
}
