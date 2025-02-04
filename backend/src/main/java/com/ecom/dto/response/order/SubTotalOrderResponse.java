package com.ecom.dto.response.order;

import com.ecom.entities.Order;
import com.ecom.entities.TotalOrder;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class SubTotalOrderResponse {
    private TotalOrder totalOrder;
    private int childOrderSize;
    private List<Order> childOrders;
}
