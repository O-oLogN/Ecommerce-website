package com.client.dto.response.order;

import com.client.entities.Order;
import com.client.entities.TotalOrder;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TotalOrderResponse {
    private TotalOrder totalOrder;
    private List<Order> childOrders;
}
