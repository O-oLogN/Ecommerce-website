package com.ecom.dto.request.order;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateTotalOrderRequest {
    private String userId;
    private List<CreateChildOrderRequest> createChildOrderRequests;
}

