package com.ecom.dto.response.order;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
public class TotalOrderResponse {
    private int totalOrderSize;
    private List<SubTotalOrderResponse> subTotalOrderResponses;
}
