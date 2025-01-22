package com.admin.dto.role;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchRoleRequest {
    private String roleName;
}
