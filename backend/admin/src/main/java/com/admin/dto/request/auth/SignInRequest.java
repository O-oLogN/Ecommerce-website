package com.admin.dto.request.auth;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignInRequest {
    private String username;
    private String password;
}
