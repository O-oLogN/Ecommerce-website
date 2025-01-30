package com.admin.dto.request.user;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchUserRequest {
    private String username;
}
