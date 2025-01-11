package com.client.repository;

import com.client.entities.TotalOrder;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TotalOrderRepository extends JpaRepository<TotalOrder, String> {
    TotalOrder findTotalOrderByTotalOrderId(@Size(max = 50) String totalOrderId);
}
