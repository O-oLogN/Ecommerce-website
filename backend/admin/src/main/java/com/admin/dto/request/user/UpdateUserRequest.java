package com.admin.dto.request.user;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {
    private String userId;
    private String username;
    private String email;
    private List<String> roleIds;
}
