package com.ecom.repository;

import com.ecom.entities.ItemBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ItemBadgeRepository extends JpaRepository<ItemBadge, String>, JpaSpecificationExecutor<ItemBadge> {
}
