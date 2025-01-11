package com.client.dto.request.order;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateTotalOrderRequest {
    private String username;
    private Float price;
    private List<CreateChildOrderRequest> createChildOrderRequests;
}
