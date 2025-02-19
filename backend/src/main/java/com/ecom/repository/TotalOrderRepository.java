package com.ecom.repository;

import com.ecom.entities.TotalOrder;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TotalOrderRepository extends JpaRepository<TotalOrder, String>, JpaSpecificationExecutor<TotalOrder> {
    TotalOrder findTotalOrderByTotalOrderId(@Size(max = 50) String totalOrderId);

    void deleteTotalOrderByTotalOrderId(@Size(max = 50) String totalOrderId);
}
