package com.ecom.repository;

import com.ecom.entities.ItemCart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemCartRepository extends JpaRepository<ItemCart, String> {
}
