package com.ecom.dto.response.order;

import com.ecom.entities.Order;
import com.ecom.entities.TotalOrder;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
public class CreateTotalOrderResponse {
    private TotalOrder totalOrder;
    private Integer numberOfChildOrders;
    private Set<Order> childOrders;
}
