package com.client.dto.response.auth;

import com.client.entities.Session;
import com.client.entities.User;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SigninResponse {
    private User user;
    private Session session;
}
