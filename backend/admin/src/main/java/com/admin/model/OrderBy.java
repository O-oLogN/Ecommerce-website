package com.admin.model;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderBy {
    private String property;
    private String direction;
}
