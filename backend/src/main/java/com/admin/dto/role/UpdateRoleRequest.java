package com.admin.dto.role;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRoleRequest {
    private String roleId;
    private String name;
}
