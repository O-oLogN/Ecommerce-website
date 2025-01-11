package com.admin.dto.request.auth;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {
    private String username;
    private String password;
    private String email;
}
