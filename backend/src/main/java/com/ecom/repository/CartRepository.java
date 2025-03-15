package com.ecom.repository;

import com.ecom.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, String> {
    Cart findCartByUserId(String userId);
}
