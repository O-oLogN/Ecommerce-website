package com.ecom.repository;

import com.ecom.entities.Order;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findOrdersByParentId(@Size(max = 50) @NotNull String parentId);
}
