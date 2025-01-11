package com.admin.dto.response.order;

import com.admin.entities.Order;
import com.admin.entities.TotalOrder;
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
